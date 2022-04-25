module.exports = {

    async index(request, response) {
        return response.render("schedule/index", { title: "Cadastro de horários" });
    }

}