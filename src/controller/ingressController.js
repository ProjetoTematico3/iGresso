const Movie = require("../model/Movie");
const Image = require("../model/Image");
const Room = require("../model/Room");
const Schedule = require("../model/Schedule");
const Seat = require("../model/Seat");
const Review = require("../model/Review");
const MovieTheater = require("../model/MovieTheater");
const Product = require("../model/Product");
const Combo = require("../model/Combo");
const Ingress = require("../model/Ingress");
const Order = require("../model/Order");
const Item = require("../model/Item");

module.exports = {

    async buy(request, response) {
        const { id_schedule } = request.params;

        const scheduleInfo = await Schedule.findByPk(id_schedule, {
            include: [
                { model: Movie, include: [Image, Review] },
                { model: Room, include: Seat }
            ]
        });

        const combos = await Combo.findAll({
            include: { model: Product }
        });

        const Orders = await Order.findAll({
            include: Item,
            where:{
                id_schedule: id_schedule,
                status: 0
            }
        });

        var items = Orders.map((i) => {return i.Items})
        items = items.reduce(function(a, b){ return a.concat(b); }, []).map((x)=> x.id_ingresso).filter(s => s)
        const Ingressos = await Ingress.findAll({
            include: [Seat],
            where:{
                id: items
            }
        });

        const SeatsN = Ingressos.map((x)=> x.Seat.id);

        var theater = await MovieTheater.findByPk(scheduleInfo.Room.id_cinema);

        return response.render('ingress/buy', { title: "Comprar Ingresso", scheduleInfo: scheduleInfo, theater: theater, combos: combos, SeatsN: SeatsN });
    },

    async newOrder(request, response) {

        const { order } = request.body;
        const logged_user = request.user;

        if (!logged_user) {
            request.session.preOrder = order;
            return response.json({ status: false, unauthorized: true });
        }


        const result = await createOrder(order, logged_user)


        return response.json({ text: "Sucesso", status: true });
    },

    async confirmOrder(request, response) {
        const { preOrder } = request.session;
        const logged_user = request.user;
        const result = await createOrder(preOrder, logged_user)

        response.redirect("/ingress/myOrders");
    },

    async myOrders(request, response) {
        const logged_user = request.user;

        const myOrders = await Order.findAll({
            where: {
                id_usuario: logged_user.id 
            },
            include: [
                { model: Item, include: [Ingress, Combo] }
            ],
        });

        var a = myOrders.map((i) => {return i.Items})
        a = a.reduce(function(a, b){ return a.concat(b); }, []).map((x)=>{return {id_ingresso: x.id_ingresso, id_combo: x.id_combo}});

        const id_schedules = myOrders.map((i)=>{return i.id_schedule});
        const id_movies = myOrders.map((i)=>{return i.id_filme});
        
        const id_ingressos = a.filter(s => s.id_ingresso).map((x)=> x.id_ingresso);
        const id_combo = a.filter(s => s.id_combo).map((x)=> x.id_combo);

        const Schedules = await Schedule.findAll({
            include:[{model: Room}] ,
            where: {
              
                id: id_schedules
            }
        })

        const Movies = await Movie.findAll({
            include: [Image, Review],
            where: {
                id: id_movies
            }
        })

        const MovieTheaters = await MovieTheater.findAll();

        const Ingressos = await Ingress.findAll({
            include: [Seat],
            where:{
                id: id_ingressos
            }
        });

        
        const Combos = await Combo.findAll({
            where:{
                id: id_combo
            }
        });

        return response.render('ingress/myOrders', { title: "Meus Ingresso", myOrders: myOrders, Schedules: Schedules, Movies: Movies, MovieTheaters: MovieTheaters, Ingressos: Ingressos, Combos: Combos });
    },

    async cancel(request, response){
        const { id } = request.query;

        const orders = await Order.findByPk(id);
        const schedule = await Schedule.findByPk(orders.id_schedule);
        const DateTimeNow = new Date();

        if(schedule < DateTimeNow){
            return response.json({ text: "Não é possível cancelar o ingresso: Tempo excedido", status: false });
        }
        await orders.update({
            status: 1
        });

        return response.json({ text: "Ingresso cancelado", status: true });

    }

}

const createOrder = async (order, logged_user) => {
    await Order.create({
        dt_cadastro: new Date(),
        id_metodo_pagamento: order.id_payment_method,
        id_usuario: logged_user.id,
        id_filme: order.id_filme,
        id_schedule: order.id_schedule,
        id_cinema: order.id_cinema,
        status: 0
    }).then(async (orders) => {
        var currentSeat = 0;
        for (let index = 0; index < order.tipo_ingresso.length; index++) {
            const tipo_ingresso = order.tipo_ingresso[index];

            for (let tipo = 0; tipo < tipo_ingresso.qtd; tipo++) {
                var seat = currentSeat;
                await Ingress.create({
                    tipo_ingresso: tipo_ingresso.tipo_ingresso,
                    id_horario: null,
                    id_lugar: order.seats[seat],
                }).then(async (ingress) => {
                    await Item.create({
                        id_ingresso: ingress.id,
                        id_pedido: orders.id,
                        quantidade: 1,
                        valor: tipo_ingresso.tipo_ingresso == 0 ? 40 : 20
                    });
                });

                currentSeat++;
            }
        }

        for (let index = 0; index < order.combos.length; index++) {
            const combo = order.combos[index];
            var a = await Combo.findByPk(combo.id_combo);
            let valor = a.preco;

            await Item.create({
                id_combo: combo.id_combo,
                id_pedido: orders.id,
                quantidade: combo.qtd,
                valor: valor
            });

        }

    });

}