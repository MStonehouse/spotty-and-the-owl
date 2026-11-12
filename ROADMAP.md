# Roadmap

Features saved for later. The full explanation of each is in the PDF "Ideas to make Spotty and the Owl shine" (November 2026).

## Next up

1. **Google Business Profile.** A free listing so the shop appears on Google Maps and in local searches ("embroidery Courtenay", "custom shirts near me"), with photos, reviews, hours and a call button. Set up and verified by Dan. Link it from the website footer once it exists.

2. **Team and club order pages.** A page per team, school or club where each member picks their sizes and pays, and Dan receives one combined order. Dan's existing Shopify store (currently unused) is a good fit. Needs from Dan: which garments and prices to offer, order deadlines, and pickup or delivery arrangements.

3. **Ballpark price estimator.** Built and live on the Pricing page, running on **sample prices**. Still needed from Dan: his real numbers for the tables in `js/estimator.js`, how wide a range he's comfortable showing, and which methods don't suit which garments. Must be done before the move to his domain.

## Can be added when Dan wants it

4. **Quote requests as Trello cards.** Each quote request becomes a card on a Trello board, with the customer's choices in the description and their artwork attached. Three ways, simplest first:
   - **Email-to-board** (no code, free): the form service also sends each request to the board's private email address (board menu, then Email-to-board). The subject becomes the card title, the body the description, and files the attachments. A `#label` in the subject applies a label. Emails over 10 MB with attachments don't make a card, so keep sending to Dan's inbox too.
   - **Zapier or Make** (no code, usually paid): maps each form field to its own place on the card (labels, due date, list). Free plans cap requests per month.
   - **A Cloudflare Worker** (some code, free): a small program on Dan's Cloudflare account holds the Trello token and creates exactly the card wanted.

   Never put a Trello key or token in the website's own JavaScript: visitors can read it, and it opens Dan's whole Trello. Needs first: the quote form connected (see README) and Dan using Trello. Start with email-to-board.

## Already noted elsewhere

- Switching to spottyandtheowlapparel.com: ready on the `domain-switch` branch; see README.
- Connecting the quote form and adding Dan's email: see README "Common changes".
