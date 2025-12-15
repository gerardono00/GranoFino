import { PayPalButtons } from "@paypal/react-paypal-js";

type Props = {
  total: number;
  onSuccess: () => void;
};

export default function PayPalButton({ total, onSuccess }: Props) {
  return (
    <PayPalButtons
      createOrder={(_data, actions) =>
        actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "MXN",
                value: total.toFixed(2),
              },
            },
          ],
        })
      }
      onApprove={async (_data, actions) => {
        await actions.order?.capture();
        onSuccess();
      }}
    />
  );
}
