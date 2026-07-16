export type ItemEditorial = {
  heading: string
  paragraphs: string[]
  relatedItemIds: string[]
}

export const itemEditorial: Record<string, ItemEditorial> = {
  'hnrs-orcw': {
    heading: 'Caesar Wings Oven Roasted Price, Calories and Allergens',
    paragraphs: [
      'The menu guide lists Caesar Wings Oven Roasted at $7.01 with 510 calories for the listed serving. Local restaurant prices, portions and availability can differ, so confirm the current total with your selected store.',
      'The available allergen record flags gluten and soy. Anyone managing a serious allergy should ask the restaurant about current ingredients and shared preparation areas before ordering.'
    ],
    relatedItemIds: ['hnrs-bufcw', 'hnrs-gpcw', 'hnrs-bbqcw']
  },
  'hnrs-cdbmm': {
    heading: 'Cookie Dough Brownie Price, Serving and Calorie Notes',
    paragraphs: [
      'This four-piece Cookie Dough Brownie made with M&M’S MINIS Chocolate Candies is listed at $4.89 and 840 calories for the full listed order. That total is more useful when compared with the serving note instead of treating it as a single-bite calorie figure.',
      'The menu record marks this dessert as vegetarian and flags gluten as an allergen. Product ingredients can change, so confirm current allergen details with the restaurant when necessary.'
    ],
    relatedItemIds: ['hnrs-kdbtwx', 'hnrs-10pcb', 'hnrs-icb']
  },
  'hnr-pep': {
    heading: 'Classic Pepperoni Price and Menu Comparison',
    paragraphs: [
      'Classic Pepperoni is listed at $8.99 and 2,300 calories for the whole pizza in this guide. The menu record identifies gluten and dairy allergens.',
      'For a close price comparison, ExtraMostBestest Pepperoni is listed one dollar higher. Compare toppings, calories and the current local total before deciding which option fits your order.'
    ],
    relatedItemIds: ['emb-pep', 'hnr-ddsp', 'hnr-chs']
  },
  'hnr-ddsp': {
    heading: 'Detroit-Style Deep Dish Pepperoni Price and Calories',
    paragraphs: [
      'Detroit-Style Deep Dish Pepperoni is listed at $11.99 and 2,770 calories for the whole pizza in this guide. Its menu record flags gluten and dairy allergens.',
      'Use the round-pizza and deep-dish category pages to compare the guide price with Classic Pepperoni and other crust styles. Store-level pricing and availability can vary.'
    ],
    relatedItemIds: ['hnr-ddch', 'hnr-pep', 'emb-pep']
  }
}
