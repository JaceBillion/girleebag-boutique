/**
 * GIRLEEBAG PRODUCT CATALOG
 * 
 * Enhanced descriptions to sound premium, smart, and inviting.
 * Fixed image paths to point to actual .jpg files found in your assets folder.
 */

const products = [
    {
        id: 1,
        name: "Amara",
        description: "Meet the Amara—your ultimate, stylish 'everything' bag. Designed for maximum versatility, it’s durable enough to carry everything from your favorite books and fresh market veggies to your beloved fur baby. Tough, chic, and ready for any adventure.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_6oU4gB2yUcnf2fOesxcjS00",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Amara_GirleeBag .jpg",
            "assets/images/Amara_GirleeBag_side.jpg",
            "assets/images/Amara_GirleeBag_bottom.jpg",
            "assets/images/Amara_GirleeBag_side.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 2,
        name: "Baby Girl",
        description: "Playful yet fiercely practical, the BabyGirl bag is an essential carry-all for the modern trendsetter. Whether you're packing for a weekend getaway, hitting the books, or bringing your puppy along for the ride, its tough construction handles it all with effortless style.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_14AcN70qMcnfbQo1FLcjS01",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/BabyGirl_front.jpg",
            "assets/images/BabyGirl_side.jpg",
            "assets/images/BabyGirl_bottom.jpg",
            "assets/images/BabyGirl_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 3,
        name: "Emerald Empress",
        description: "Dramatic, moody, and undeniably elegant, the Emerald Empress is for the girl who means business. This premium carry-all easily transitions from a sophisticated makeup tote to a sturdy companion for your books, daily essentials, or even your pampered pet.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_14AeVf4H25YR3jSfwBcjS02",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Emerald_front.jpg",
            "assets/images/Emerald_side.jpg",
            "assets/images/Emerald_bottom.jpg",
            "assets/images/Emerald_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 4,
        name: "GamerGirl",
        description: "Level up your look with the GamerGirl bag. Featuring vibrant, concert-ready artwork, this spacious tote is engineered to carry your tech gear, daily essentials, or favorite furry friend. A tough, statement-making piece for the girl who plays to win.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_eVq5kFb5q1IB1bKfwBcjS03",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Gamer_Girl_front.jpg",
            "assets/images/Gamer_Girl_side.jpg",
            "assets/images/Gamer_Girl_bottom.jpg",
            "assets/images/Gamer_Girl_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 5,
        name: "Italia Summer",
        description: "Capture the essence of a sun-drenched villa with the Italia Summer bag. This gorgeously illustrated tote brings a touch of European elegance to your daily routine. Expertly crafted to be tough and durable, it's perfect for carrying groceries, books, or providing a chic ride for your pet.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_fZu14pc9ufzr7A82JPcjS04",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Italia_summer_front.jpg",
            "assets/images/Italia_summer_side.jpg",
            "assets/images/Italia_summer_bottom.jpg",
            "assets/images/Italia_summer_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 6,
        name: "Black & White",
        description: "A study in sleek contrast, the Black & White GirleeBag offers timeless sophistication. Built for the modern multitasker, this heavy-duty 'everything' bag effortlessly transports your daily haul—from books to boutique finds—while keeping your style flawlessly sharp.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_7sY28t1uQ72VbQo5W1cjS05",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/The_Black_and_White_front.jpg",
            "assets/images/The_Black_and_White_side.jpg",
            "assets/images/The_Black_and_White_bottom.jpg",
            "assets/images/The_Black_and_White_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 7,
        name: "LeFemme",
        description: "Artistic and contemplative, the LeFemme features a striking illustration that commands attention. Beneath its beautiful exterior lies a rugged, durable carry-all. Perfect as a spacious makeup case, an essential weekend tote, or a stylish pet carrier.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_3cI00l2yUcnf6w43NTcjS06",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/LeFemme_front.jpg",
            "assets/images/LeFemme_side.jpg",
            "assets/images/LeFemme_bottom.jpg",
            "assets/images/LeFemme_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 8,
        name: "Pearl Bubble",
        description: "Step out with the playful elegance of the Pearl Bubble bag. With its unique texture and durable build, this versatile tote is designed to handle your busiest days. Pack your essentials, bring along your puppy, or hit the shops with confidence.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_14AcN73CY4UN9Ig705cjS07",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Pearl_Bubble_front.jpg",
            "assets/images/Pearl_Bubble_side.jpg",
            "assets/images/Pearl_Bubble_bottom.jpg",
            "assets/images/Pearl_Bubble_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 9,
        name: "Perla",
        description: "Radiant and expressive, the Perla bag showcases stunning artwork that celebrates beauty and culture. As durable as it is gorgeous, this reliable 'everything' bag easily accommodates your lifestyle, whether you're carrying books, makeup, or your favorite small pet.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_00weVf1uQaf78Ec705cjS08",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Perla_Girlee_Bag_front.jpg",
            "assets/images/Perla_Girlee_Bag_bottom.jpg",
            "assets/images/Perla_Girlee_Bag_pouch.jpg",
            "assets/images/Perla_Girlee_Bag_bottom.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 10,
        name: "Starlight",
        description: "Shine wherever you go with the Starlight GirleeBag. Engineered for durability without sacrificing an ounce of style, this versatile tote is your ultimate companion for late-night adventures, daily errands, or safely transporting your puppy.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_28E00lddydrj6w4fwBcjS09",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Starlight_front.jpg",
            "assets/images/Starlight_side.jpg",
            "assets/images/Starlight_bottom.jpg",
            "assets/images/Starlight_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 11,
        name: "The Influencer",
        description: "Always ready for the camera, The Influencer bag is the ultimate statement piece. It’s spacious, incredibly tough, and flawlessly chic. Designed to carry your makeup empire, tech gear, or pampered pet while ensuring you look picture-perfect.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_bJe3cxddy86Z07G98dcjS0a",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/The_Influencer_front.jpg",
            "assets/images/The_Influencer_side.jpg",
            "assets/images/The_Influencer_bottom.jpg",
            "assets/images/The_Influencer_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 12,
        name: "SistaGirl",
        description: "Embrace mid-century modern glamour with the SistaGirl bag. Featuring a striking, retro-inspired motif, this bag is a true work of art. Built with tough, premium materials, it’s the ideal chic carrier for your daily essentials, groceries, or furry companion.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_5kQeVf6Pa4UN1bK3NTcjS0b",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Sista_Girl_front.jpg",
            "assets/images/Sista_Girl_side.jpg",
            "assets/images/Sista_Girl_bottom.jpg",
            "assets/images/Sista_Girl_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 13,
        name: "Pink Bubble",
        description: "Pop into your day with the bright, energetic Pink Bubble bag. This eye-catching tote adds a splash of fun to any outfit while providing serious durability. An 'everything' bag that effortlessly handles your books, makeup, or pet with vibrant style.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_dRm8wR8Xi72V2fOachcjS0c",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Pink_Bubble_front.jpg",
            "assets/images/Pink_Bubble_side.jpg",
            "assets/images/Pink_Bubble_bottom.jpg",
            "assets/images/Pink_Bubble_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 14,
        name: "Vanilla Peppermint",
        description: "Sweet, refreshing, and incredibly tough. The Vanilla Peppermint bag combines a crisp aesthetic with heavy-duty practicality. Whether you're stocking up at the farmer's market, packing for the gym, or bringing your cat along, this bag handles it beautifully.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_bJe7sNa1m2MF8EcdotcjS0d",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Vanilla_Peppermint_front.jpg",
            "assets/images/Vanilla_Peppermint_side.jpg",
            "assets/images/Vanella_Peppermint_bottom.jpg",
            "assets/images/Vanilla_Peppermint_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    },
    {
        id: 15,
        name: "Turkish Bubble",
        description: "Exotic and texturally rich, the Turkish Bubble bag offers a unique, premium look. This robust carry-all is designed to be your go-to companion for any occasion. Exceptionally durable, it's perfect for safely hauling everything from personal items to your puppy.",
        price: 44.00,
        stripeLink: "https://buy.stripe.com/test_8x23cx1uQaf76w4705cjS0e",
        stripePriceId: "PASTE_PRICE_ID_HERE",
        images: [
            "assets/images/Turqish_front.jpg",
            "assets/images/Turqish_side.jpg",
            "assets/images/Turqish_bottom.jpg",
            "assets/images/Turqish_pouch.jpg"
        ],
        category: "Beach Bag, Carry All, Tote, Gamer Girl Bag"
    }
];

export default products;
