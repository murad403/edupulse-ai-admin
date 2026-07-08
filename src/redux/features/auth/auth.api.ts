import baseApi from "@/redux/api/api";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data
                }
            }
        })
    })
})

export const {
} = authApi;