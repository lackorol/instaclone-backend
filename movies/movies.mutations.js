import client from "../client";

module.exports = {
    Mutation: {
    createMovie: (_, { title, year, genre }) => 
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
    }),

    deleteMovie: (_, {id}) => client.movie.delete({where: {id}}),
    updateMovie: (_, {year}) => client.movie.update({where: {id}, data: {year}})
  },
};