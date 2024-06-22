// import prismaClient from "@repo/db/client";


// const authMdidleware = async (req, res, next) => {
//     const authHeader = req.headers.session;
//     try {
//         const user = await prismaClient.user.findFirst({
//             where: {
//                 email: authHeader.user?.email
//             }
//         });

//         if (!user) {
//             return
//         }
//     } catch (error) {

//     }
// };