import * as Yup from "yup";
import {
  BasketballPosition,
  FootballPosition,
  GameWeek,
  VolleyballPosition,
} from "./constants";

export const UserSignupSchema = Yup.object().shape({
  email: Yup.string().required("Insert your email"),
  firstname: Yup.string().required("Insert your firstname"),
  lastname: Yup.string().required("Insert your lastname"),
  password: Yup.string()
    .required("Please insert your password")
    .min(5, "Password should be at least 5 characters long"),
  cpassword: Yup.string()
    .required("Please confirm your password")
    .min(5, "Password should be at least 5 characters long")
    // @ts-ignore
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Insert your email"),
  password: Yup.string()
    .required("Please insert your password")
    .min(5, "Password should be at least 5 characters long"),
  loginAlways: Yup.boolean(),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Insert your email"),
});

export const AddMatchStatsSchema = Yup.object().shape({
  team: Yup.string().required("Team is required"),
  player_id: Yup.string().required("Player is required"),
  selectedStat: Yup.string().required("Stat is required"),
  selectedNumber: Yup.number()
    .required("Number is required")
    .positive("Number must be positive")
    .integer("Number must be an integer"),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Insert your password")
    .min(5, "Password should be at least 5 characters long"),
  cpassword: Yup.string()
    .required("Please confirm your password")
    .min(5, "Password should be at least 5 characters long")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

export const ProfileSettingsSchema = Yup.object().shape({
  firstname: Yup.string().required("Please insert your firstname"),
});

export const AddLineupSchema = Yup.object().shape({
  team_id: Yup.string().required("Tean Id is required"),
  players: Yup.array().of(
    Yup.object().shape({
      player_id: Yup.string().required("Player is required"),
      isSubstitute: Yup.boolean().required("Substitute status is required"),
    })
  ),
});

export const AddPlayerSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  playerNumber: Yup.number()
    .required("Player number is required")
    .positive("Player number must be a positive number")
    .integer("Player number must be an integer"),
  season: Yup.string().required("Season is required"),
  position: Yup.string()
    .oneOf([
      ...Object.values(FootballPosition),
      ...Object.values(BasketballPosition),
      ...Object.values(VolleyballPosition),
    ])
    .required("Position is required"),
  playerRole: Yup.string()
    .oneOf(["Captain", "Player", "Assistant Captain"])
    .required("Player role is required"),
  team: Yup.string().required("Team is required"),
  profileImage: Yup.string().url("Invalid URL for profile image"),
});

export const EditPlayerSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  playerNumber: Yup.number()
    .required("Player number is required")
    .positive("Player number must be a positive number")
    .integer("Player number must be an integer"),
  position: Yup.string()
    .oneOf([
      ...Object.values(FootballPosition),
      ...Object.values(BasketballPosition),
      ...Object.values(VolleyballPosition),
    ])
    .required("Position is required"),
  playerRole: Yup.string()
    .oneOf(["Captain", "Player", "Assistant Captain"])
    .required("Player role is required"),
  profileImage: Yup.string().url("Invalid URL for profile image"),
});

export const AddPostSchema = Yup.object().shape({
  season: Yup.string().required("Season is required"),
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  author: Yup.string().required("Author is required"),
  image: Yup.string().url("Invalid URL for image"),
});

export const AddFixtureResultSchema = Yup.object().shape({
  sport: Yup.string().required("Sport is required"),
  division: Yup.string().required("Division is required"),
  season: Yup.string().required("Season is required"),
  fixtures: Yup.object().shape({
    home_team_id: Yup.string().required("Home team is required"),
    away_team_id: Yup.string().required("Away team is required"),
    date: Yup.date().required("Date is required"),
  }),
});

export const AddPictureSchema = Yup.object().shape({
  season: Yup.string().required("Season is required"),
  sport: Yup.string().required("Sport is required"),
  gameweek: Yup.mixed()
    .oneOf(Object.values(GameWeek))
    .required("Gameweek is required"),
  image: Yup.string().required("Image is required"),
  date: Yup.date().required("Date is required"),
});
