import { BalanceSuffix, Flex, SpendableBalance } from "../styled";
import { Text } from "@blueprintjs/core";

import NumberFormat from "react-number-format";
import React from "react";
import { useTranslation } from "react-i18next";

export type WalletBalanceProps = {
  spendable: number;
};
export const WalletBalanceComponent = ({ spendable }: WalletBalanceProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Text>{t("spendable")}:</Text>
      <Flex>
        <SpendableBalance>
          <NumberFormat
            data-testid="spendable"
            value={spendable.toLocaleString("en-US", {
              useGrouping: true,
              maximumSignificantDigits: 9,
            })}
            type={"text"}
            displayType={"text"}
            decimalScale={9}
            thousandSeparator={true}
            fixedDecimalScale={true}
          />
        </SpendableBalance>
        <BalanceSuffix>ツ</BalanceSuffix>
      </Flex>
    </div>
  );
};
