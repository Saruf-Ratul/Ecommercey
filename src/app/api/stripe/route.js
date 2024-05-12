import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
    "pk_test_51PFTMgIyZrkcI1TgQOH0UexyrTzQdma0AUJgHqIWqVXE9gKG6sd1t0nS4osg15lWLmEHbDitWsMBWsLvRRUmpcR600SE8ihrcM"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const res = await req.json();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "https://ecommercey-kahpmyf5r-sarufratuls-projects.vercel.app/checkout" + "?status=success",
                cancel_url: "https://ecommercey-kahpmyf5r-sarufratuls-projects.vercel.app/checkout" + "?status=cancel",
            });

            return NextResponse.json({
                success: true,
                id: session.id,
            });
        } else {
            return NextResponse.json({
                success: true,
                message: "You are not authenticated",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}
