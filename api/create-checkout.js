/**
 * GIRLEEBAG STRIPE CHECKOUT — Vercel Serverless Function
 * 
 * This function runs on Vercel's server (not in the browser), so your
 * Stripe Secret Key stays completely safe.
 *
 * Required Vercel Environment Variables:
 *   STRIPE_SECRET_KEY  — your Stripe secret key (sk_test_... or sk_live_...)
 *   SITE_URL           — your deployed URL e.g. https://girleebag.vercel.app
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart.' });
        }

        // Build Stripe line items dynamically — no Price IDs needed!
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: 'GirleeBag Original — 100% PU Faux Leather',
                    // Include the product image on the Stripe checkout page
                    ...(item.image && { images: [`${process.env.SITE_URL}/${item.image}`] }),
                },
                unit_amount: Math.round(item.price * 100), // Stripe uses cents
            },
            quantity: item.quantity,
        }));

        // Create the Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_URL}/`,
            // Optional: collect shipping address
            // shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        });

        // Return the Stripe-hosted checkout URL
        res.status(200).json({ url: session.url });

    } catch (error) {
        console.error('Stripe checkout error:', error.message);
        res.status(500).json({ error: error.message });
    }
};
