import { NextAdminOptions } from "@premieroctet/next-admin"

export const options: NextAdminOptions = {
  model: {
    User: {
      toString: (user) => `${user.email}`,
      list: {
        display: ["email", "name", "role", "createdAt"],
        search: ["email", "name"],
      },
      edit: {
        display: ["email", "name", "role"],
      },
    },
    Product: {
      toString: (product) => `${product.name}`,
      list: {
        display: ["name", "price", "stock", "createdAt"],
        search: ["name", "description"],
      },
      edit: {
        display: ["name", "description", "price", "stock"],
      },
    },
  },
}


