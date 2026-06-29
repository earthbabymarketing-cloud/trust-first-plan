export const SHOPIFY_DOMAIN = "earthbabyonline.myshopify.com";
export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STOREFRONT_TOKEN = "f7816249a1a350ae365a84be8288b062";
const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

async function gql(query: string, variables: Record<string, unknown> = {}) {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!r.ok) throw new Error(`Shopify ${r.status}`);
  const d = await r.json();
  if (d.errors) throw new Error(d.errors.map((e: { message: string }) => e.message).join(", "));
  return d.data;
}

const CART_CREATE = `mutation($input: CartInput!){
  cartCreate(input:$input){ cart{ id checkoutUrl } userErrors{ message } }
}`;

function withChannel(url: string) {
  try { const u = new URL(url); u.searchParams.set("channel", "online_store"); return u.toString(); } catch { return url; }
}

export async function createShopifyCheckout(lines: { merchandiseId: string; quantity: number }[]): Promise<string> {
  const data = await gql(CART_CREATE, { input: { lines } });
  const errs = data?.cartCreate?.userErrors ?? [];
  if (errs.length) throw new Error(errs.map((e: { message: string }) => e.message).join(", "));
  const url = data?.cartCreate?.cart?.checkoutUrl;
  if (!url) throw new Error("No checkout URL");
  return withChannel(url);
}
