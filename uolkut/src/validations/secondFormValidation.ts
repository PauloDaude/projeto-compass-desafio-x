import * as yup from 'yup';

export const userSchema = yup.object().shape({
  whoAmI: yup.string().required(),
  interests: yup.string().required(),
  children: yup.number(),
  pictureURL: yup.string().required(),
  favoriteSongs: yup.string().required(),
  favoriteMovies: yup.string().required()
});
