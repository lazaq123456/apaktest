import { createHandler } from "@premieroctet/next-admin/appHandler"
import { prisma } from "@/lib/prisma"
import { options } from "@/app/admin/[[...nextadmin]]/options"

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  options,
})

export { run as GET, run as POST, run as DELETE }

