import { createHmac } from "crypto";

/**
 * @description Verifies the receieved signature with the Typeform signing secret assigned to the webhook. If the webhook signature is verifiable, the function will return true
 * @see https://www.typeform.com/developers/webhooks/secure-your-webhooks/
 * @param {String} receivedSignature
 * @param {String} payload
 * @returns {boolean}
 */
export const verifySignature = (receivedSignature, payload) => {
  const hash = createHmac("sha256", process.env.TYPEFORM_SIGNING_SECRET)
    .update(payload)
    .digest("base64");
  return receivedSignature === `sha256=${hash}`;
};
