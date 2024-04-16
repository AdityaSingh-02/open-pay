import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                number: {
                    label: "Number:",
                    type: "text",
                    placeholder: "Phone Number",
                    required: true,
                },
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Email",
                    required: true,
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password",
                    required: true,
                },
            },
            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                try {
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            number: credentials.number.toString(),
                        },
                    });
                    if (existingUser) {
                        const validatePass = await bcrypt.compare(
                            credentials.password,
                            existingUser.password
                        );
                        console.log("existing")
                        if (validatePass) {
                            return {
                                id: existingUser.id.toString(),
                                email: existingUser.email,
                                name: existingUser.name,
                                phone: existingUser.number,
                            };
                        }
                        return null;
                    }

                    const user = await prisma.user.create({
                        data: {
                            // test your login dummy data here
                            // Goto localhost:3002/user (update data as req) to seed dummy data
                            // While using dummy data please remove hashed password
                            name: credentials.name,
                            email: credentials.email,
                            password: hashedPassword,
                            number: credentials.number,
                        },
                    });
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name,
                        phone: user.number,
                    };
                } catch (error) {
                    console.error(error);
                }
                return null;
            },
        }),
    ],
};
