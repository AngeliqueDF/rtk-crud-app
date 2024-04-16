import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/users" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "/",
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, { displayName: string; email: string }>({
      query: (newUser: { displayName: string; email: string }) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<User, string>({
      query: (deleteUserID: string) => ({
        url: "/" + deleteUserID,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUserStatus: builder.mutation<
      User,
      { updateID: string; enabled: boolean }
    >({
      query: ({
        updateID,
        enabled,
      }: {
        updateID: string;
        enabled: boolean;
      }) => ({
        url: "/" + updateID,
        method: "PATCH",
        body: {
          enabled: !enabled,
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      User,
      { updateID: string; displayName: string; email: string }
    >({
      query: ({
        updateID,
        displayName,
        email,
      }: {
        updateID: string;
        displayName: string;
        email: string;
      }) => ({
        url: "/" + updateID,
        method: "PATCH",
        body: {
          displayName,
          email,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useUpdateUserMutation,
} = usersApi;
