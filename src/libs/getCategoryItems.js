const getCategoryItems = () => {
  const allItems = [
    {
      id: 1,
      name: "All Categories",
      path: "/collections/kitchenware",
      icon: "FaBoxOpen", // 👈 string only
    },
    {
      id: 3,
      name: "Spices",
      path: "/collections/spices",
      icon: "FaPepperHot",
      dropdown: [
        {
          title: "Spices",
          path: "/collections/spices",
          icon: "FaStar",
          items: [
            { name: "All Spices", path: "/collections/spices", icon: "FaList" },
            {
              name: "Spice Bundle Savings",
              path: "/collections/spice-bundles",
              icon: "FaTags",
            },
            {
              name: "Refillable Spice Grinders",
              path: "/collections/refillable-grinders",
              icon: "FaSync",
            },
            {
              name: "Giant Spice Grinders",
              path: "/collections/spice-grinders",
              icon: "FaExpand",
            },
            {
              name: "Giant Spice Shakers",
              path: "/collections/giant-spice-shakers",
              icon: "FaPepperHot",
            },
            {
              name: "Glass Spice Jars",
              path: "/collections/glass-spice-jars",
              icon: "FaGlassWhiskey",
            },
            {
              name: "Resealable Spice Pouches",
              path: "/collections/resealable-spice-pouches",
              icon: "FaLock",
            },
            {
              name: "Oil & Vinegars",
              path: "/collections/vinegars-and-oils",
              icon: "FaTint",
            },
            { name: "Paprika", path: "/collections/paprika", icon: "FaFire" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Kitchenware",
      path: "/collections/kitchenware",
      icon: "FaUtensils",
      dropdown: [
        {
          title: "Kitchenware",
          path: "/collections/kitchenware",
          icon: "FaThLarge",
          items: [
            {
              name: "All Kitchenware",
              path: "/collections/kitchenware",
              icon: "FaList",
            },
            {
              name: "Utensils",
              path: "/collections/utensils",
              icon: "FaUtensils",
            },
            {
              name: "Pestle & Mortars",
              path: "/collections/pestle-and-mortars",
              icon: "FaMortarPestle",
            },
            {
              name: "Chopping Boards",
              path: "/collections/chopping-boards",
              icon: "FaCuttingBoard",
            },
            {
              name: "Tableware",
              path: "/collections/tableware",
              icon: "FaTable",
            },
            { name: "Cookware", path: "/collections/cookware", icon: "FaFire" },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Homware",
      path: "/collections/kitchenware",
      icon: "GiSaltShaker", // 👈 string only
    },
    {
      id: 5,
      name: "Salt Lamps",
      path: "/collections/kitchenware",
      icon: "TbSalt", // 👈 string only
    },
  ];
  return allItems;
};

export default getCategoryItems;
