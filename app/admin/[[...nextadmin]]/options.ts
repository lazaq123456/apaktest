import { NextAdminOptions } from "@premieroctet/next-admin"

export const options: NextAdminOptions = {
  basePath: "/admin",
  title: "Panel Administracyjny",
  model: {
    User: {
      toString: (user) => `${user.email}`,
      list: {
        display: ["email", "name", "role", "createdAt"],
        search: ["email", "name"],
      },
      edit: {
        display: ["email", "name", "role"],
        fields: {
          password: {
            format: "password",
            helperText: "Pozostaw puste, aby nie zmieniać hasła",
          },
        },
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
        fields: {
          price: {
            helperText: "Cena w PLN",
          },
          stock: {
            helperText: "Ilość na stanie",
          },
        },
      },
    },
  },
}


