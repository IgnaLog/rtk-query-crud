import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks", // We make a request to /tasks
      providesTags: ["Tasks"], // We assign a name to the query so that we can later use it in another query. In this case we call it Tasks
      transformResponse: (response) => response.sort((a, b) => b.id - a.id), // Transforms the returned data. In this case we order them from smallest to largest.
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        // We are going to make a new request and receive a new task as a parameter when calling createTask
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"], // When the post is finished, we update the global status data by consulting getTask with its name Tasks
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: `/tasks/${updatedTask.id}`,
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = apiSlice;
