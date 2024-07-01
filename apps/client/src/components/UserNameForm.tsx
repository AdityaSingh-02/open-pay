"use client"
import { z } from "zod"

import { Button } from "@/components/shad/ui/button"
import { Input } from "@/components/shad/ui/input"
import { toast } from "@/components/shad/ui/use-toast"
import React from "react"

const FormSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 2 characters.",
    }),
})
export function UserNameForm() {

    const usernameRef = React.useRef<HTMLInputElement>(null)

    const isUsernameAvailable = async (username: string) => {

        return { data: { success: false } }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (usernameRef.current) {
            const { success, data, error } = FormSchema.safeParse({ username: usernameRef.current.value });
            if (error) {
                toast({
                    variant: "destructive",
                    description: error.errors[0].message,
                })
                return;
            }
            if(success){
                const res = await isUsernameAvailable(data.username);
                if(res.data.success){
                    toast({
                        variant: "success",
                        description: "Success - Username is available"
                    })
                }else{
                    toast({
                        variant: "destructive",
                        description: "Sorry ;( - Username is not available"
                    })
                
                }
            }
        }
    }

    return (
        <div className="md:w-[50%] w-full md:border-2 py-10 rounded-xl p-10">
            <div className="space-y-6 w-2/3 mx-auto">
                <h1>Username</h1>
                <Input ref={usernameRef} placeholder="shadcn" />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div >
    )
}
