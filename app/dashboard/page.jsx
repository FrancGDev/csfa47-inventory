
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DashboardPage() {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")

    }
    return (
        <main>
            <section class="p-4">
                <div>hola que tal</div>
            </section>
        </main>
    )
}