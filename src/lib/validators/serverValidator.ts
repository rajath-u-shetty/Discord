import { z } from "zod";

export const serverSchema = z.object({
    name: z.string().min(1),
    image: z.string().min(1)
})

export type serverRequest = z.infer<typeof serverSchema>