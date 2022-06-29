#  Lab 1 - Conhecendo o dataset
#

# Definindo o diretório de trabalho
setwd("C:\\Users\\Gabri\\Downloads")

# Remoção de qualquer variável do ambiente
rm(list=ls())

################################################################################
# 1. LEITURA DOS DADOS                                                         #  
################################################################################
dados = read.csv("Rice_Osmancik_Cammeo_Dataset.csv", 
                 header = T, dec = ",", sep=";")

str(dados)

# Dados sobre a base lida
nrow(dados)
ncol(dados)
dim(dados)

################################################################################
# 2. PREPARAÇÃO DA ESTRUTURA DOS DADOS                                         #
################################################################################
# Converter a coluna de rótulos em factor
dados$CLASS = factor(dados$CLASS, labels=c("Cammeo","Osmancik"))

# Padronizar os nomes das colunas
names(dados) = c("Area", "Perimeter", "MajorAxis", "MinorAxis", 
                 "Eccentricity", "ConvexArea", "Extent", "Class")
summary(dados)

################################################################################
# 3. VISUALIZAÇÃO                                                              #
################################################################################
# Plotar distribuição dos dados
barplot(table(dados$Occupancy)) 

library(ggplot2)
ggplot(dados,aes(Class,fill=Class)) + 
  geom_bar() + 
  geom_text(aes(label = ..count..), stat = "count", vjust = 1.5, colour = "white") +
  theme(legend.position="none")

# Probabilidade a priori
summary(dados$Class) / nrow(dados) * 100
