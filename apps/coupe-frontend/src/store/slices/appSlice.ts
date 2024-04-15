import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  FixtureResultProps,
  PlayerProps,
  PostProps,
  TeamsProps,
  VideosWithDetails,
} from "../../utils/constants";
import { StandingsProps } from "../interfaces/user.interface";

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState()?.auth?.token;

    if (token) {
      headers.set("x-access-token", token);
    }
    return headers;
  },
});

// Create an API slice
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery,
  tagTypes: ["User", "Standing", "Post", "Player", "Team", "Match"],
  keepUnusedDataFor: 60000,
  endpoints: (builder) => ({
    loadUser: builder.query<any, void>({
      query: () => "users/user",
      providesTags: ["User"],
    }),

    getSeasons: builder.query<any, void>({
      query: () => "/seasons",
    }),

    getVideos: builder.query<VideosWithDetails, void>({
      query: () => "/videos",
    }),

    getVideosWithLimit: builder.query<VideosWithDetails, any>({
      query: (maxLimit) => `/videos/videos-with-limit/${maxLimit}`,
    }),

    getPostsById: builder.query<PostProps, any>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_result, _error, postId) => [{ type: "Post", id: postId }],
    }),

    getPostsBySeason: builder.query<PostProps[], any>({
      query: (seasonId) => `/posts/season/${seasonId}`,
      providesTags: (_result, _error, seasonId) => [
        { type: "Post", id: seasonId },
      ],
    }),

    getPostsBySeasonWithLimit: builder.query<PostProps[], any>({
      query: ({ seasonId, maxLimit }) =>
        `/posts/season/${seasonId}/posts-with-limit/${maxLimit}`,
      providesTags: (_result, _error, { seasonId, maxLimit }) => [
        { type: "Standing", id: `${seasonId}-${maxLimit}` },
      ],
    }),

    getAllStandings: builder.query<StandingsProps[], void>({
      query: () => "/standings",
      providesTags: [{ type: "Standing" }], // Provide a tag for caching
    }),

    getStandingsBySeason: builder.query<StandingsProps[], string>({
      query: (seasonId) => `/standings/season/${seasonId}`,
      providesTags: (_result, _error, seasonId) => [
        { type: "Standing", id: seasonId },
      ], // Provide a tag for caching
    }),

    getStandingsBySeasonDivisionSport: builder.query<
      StandingsProps[],
      { seasonId: string; division: string; sport: string }
    >({
      query: ({ seasonId, division, sport }) => ({
        url: `/standings/${seasonId}/${division}/${sport}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { seasonId, division, sport }) => [
        { type: "Standing", id: `${seasonId}-${division}-${sport}` },
      ], // Provide a tag for caching
    }),

    updateStanding: builder.mutation<StandingsProps, Partial<StandingsProps>>({
      query: ({ _id, ...updates }) => ({
        url: `/standings/${_id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: "Standing", _id }], // Invalidate cache for the updated standing
    }),

    createPost: builder.mutation<PostProps, any>({
      query: (postDto) => ({
        url: "/posts",
        method: "POST",
        body: postDto,
      }),
      invalidatesTags: ["Post"], // Invalidate cache for players after creating a new player
    }),

    createPlayer: builder.mutation<PlayerProps, any>({
      query: (playerDto) => ({
        url: "/players",
        method: "POST",
        body: playerDto,
      }),
      invalidatesTags: ["Player"], // Invalidate cache for players after creating a new player
    }),

    getPlayerById: builder.query<PlayerProps, string>({
      query: (playerId) => `/players/${playerId}`,
      providesTags: (_result, _error, playerId) => [
        { type: "Player", id: playerId },
      ],
    }),

    getPlayersByTeamId: builder.query<PlayerProps[], string>({
      query: (teamId) => `/players/team/${teamId}`,
      providesTags: (_result, _error, teamId) => [{ type: "Player", id: teamId }],
    }),

    getTeams: builder.query<TeamsProps[], void>({
      query: () => "/teams/",
      providesTags: [{ type: "Team" }],
    }),

    updatePlayer: builder.mutation<
      PlayerProps,
      { playerId: string; updates: any }
    >({
      query: ({ playerId, updates }) => ({
        url: `/players/${playerId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (_result, _error, { playerId }) => [
        { type: "Player", id: playerId },
      ],
    }),

    deletePlayer: builder.mutation<void, string>({
      query: (playerId) => ({
        url: `/players/${playerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, playerId) => [
        { type: "Player", id: playerId },
      ],
    }),

    getPlayersBySeasonDivisionSport: builder.query<
      any[],
      { seasonId: string; division: string; sport: string }
    >({
      query: ({ seasonId, division, sport }) => ({
        url: `/players/${seasonId}/${division}/${sport}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { seasonId, division, sport }) => [
        { type: "Player", id: `${seasonId}-${division}-${sport}` },
      ], // Provide a tag for caching
    }),

    getPlayersBySeason: builder.query<any[], string>({
      query: (seasonId) => ({
        url: `/players/${seasonId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, seasonId) => [
        { type: "Player", id: seasonId },
      ],
    }),

    getPlayersCountByCurrentSeason: builder.query<number, void>({
      query: () => "/players/season/current-season-count",
      providesTags: [{ type: "Team", id: "count" }],
    }),

    getFixtureResultsBySeasonDivisionSport: builder.query<
      FixtureResultProps[],
      any
    >({
      query: ({ seasonId, division, sport }) => ({
        url: `/fixture-results/${seasonId}/${division}/${sport}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { seasonId, division, sport }) => [
        { type: "Match", id: `${seasonId}-${division}-${sport}` },
      ], // Provide a tag for caching
    }),

    createFixtureResult: builder.mutation<FixtureResultProps, any>({
      query: (createFixtureResultDto) => ({
        url: "/fixture-results",
        method: "POST",
        body: createFixtureResultDto,
      }),
      invalidatesTags: ["Match", "Player", "Standing"], // Invalidate standing cache after creating a new fixture result
    }),

    getFixtureResultById: builder.query<FixtureResultProps, any>({
      query: (id) => `/fixture-results/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Match", id }],
    }),

    getAllFixtureResults: builder.query<FixtureResultProps[], void>({
      query: () => "/fixture-results",
      providesTags: [{ type: "Match" }],
    }),

    addLineUp: builder.mutation<FixtureResultProps, any>({
      query: ({ id, ...addLineUpDto }) => ({
        url: `/fixture-results/lineup/${id}`,
        method: "PUT",
        body: addLineUpDto,
      }),
      invalidatesTags: ["Match", "Team"], // Invalidate match cache after updating a fixture result
    }),

    updateFixtureResult: builder.mutation<FixtureResultProps, any>({
      query: ({ id }) => ({
        url: `/fixture-results/result/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Match", "Player", "Standing", "Team"], // Invalidate match cache after updating a fixture result
    }),

    updateFixtureResultStats: builder.mutation<FixtureResultProps, any>({
      query: ({ id, props }) => ({
        url: `/fixture-results/stats/${id}`,
        method: "PUT",
        body: props,
      }),
      invalidatesTags: ["Match", "Player", "Standing", "Team"], // Invalidate match cache after updating a fixture result
    }),

    deleteFixtureResult: builder.mutation<void, string>({
      query: (id) => ({
        url: `/fixture-results/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Match", id }], // Invalidate match cache after deleting a fixture result
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoadUserQuery,
  useGetSeasonsQuery,
  useGetPostsByIdQuery,
  useGetPostsBySeasonWithLimitQuery,
  useGetVideosQuery,
  useGetVideosWithLimitQuery,
  useGetPostsBySeasonQuery,
  useGetAllStandingsQuery,
  useGetStandingsBySeasonQuery,
  useGetPlayersByTeamIdQuery,
  useGetStandingsBySeasonDivisionSportQuery,
  useGetPlayersBySeasonDivisionSportQuery,
  useGetPlayersCountByCurrentSeasonQuery,
  useGetPlayersBySeasonQuery,
  useUpdateStandingMutation,
  useGetTeamsQuery,
  useAddLineUpMutation,
  useCreatePlayerMutation,
  useUpdateFixtureResultStatsMutation,
  useCreatePostMutation,
  useGetPlayerByIdQuery,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
  useCreateFixtureResultMutation,
  useGetFixtureResultsBySeasonDivisionSportQuery,
  useGetFixtureResultByIdQuery,
  useGetAllFixtureResultsQuery,
  useUpdateFixtureResultMutation,
  useDeleteFixtureResultMutation,
} = appApi;
