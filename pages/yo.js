import { Link, Heading, Box } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <div>
      <Box my={8}>
        <Heading>Mainnet</Heading>
        <ul>
          <li>
            <Link
              href="strike:bitcoin:bc1q8n477r3dnrdpm5cvz8t7w33trg57ndschkhydt?amount=6.15"
              variant="brand"
            >
              strike:bitcoin:bc1q8n477r3dnrdpm5cvz8t7w33trg57ndschkhydt?amount=6.15
            </Link>
          </li>
          <li>
            <Link
              href="strike:lightning:lnbc1500n1p3z0dpupp5t02jrudxsnrhh0ck5gj0wxnmga6vkvmpu6wx2m7kfnczkxecedsqdpa2fjkzep6ypyx7aeqw3hjqct4w3hk6ct5d93kzmrv0ys82uryv96x2greda6hycqzysxqr23ssp5gu2qqxxxeasqat7kxf2uprusy7yla8zcjjmrfc06degd4hpap2ts9qyyssqhegu8hctx4eg8cnjnjtp05quj6r3q3ga3902wc3ekt76ku2g0murgkjcaqsaczx0upnrc9jhxvea6f7szg9ktd720jy32h89xv3d3rgp7ganr6"
              variant="brand"
            >
              strike:lightning:lnbc1500n1p3z0dpupp5t02jrudxsnrhh0ck5gj0wxnmga6vkvmpu6wx2m7kfnczkxecedsqdpa2fjkzep6ypyx7aeqw3hjqct4w3hk6ct5d93kzmrv0ys82uryv96x2greda6hycqzysxqr23ssp5gu2qqxxxeasqat7kxf2uprusy7yla8zcjjmrfc06degd4hpap2ts9qyyssqhegu8hctx4eg8cnjnjtp05quj6r3q3ga3902wc3ekt76ku2g0murgkjcaqsaczx0upnrc9jhxvea6f7szg9ktd720jy32h89xv3d3rgp7ganr6
            </Link>
          </li>
        </ul>
      </Box>
      <Heading>Testnet</Heading>
      <ul>
        <li>
          <Link
            href="strike:bitcoin:mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt?amount=6.15"
            variant="brand"
          >
            strike:bitcoin:mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt?amount=6.15
          </Link>
        </li>
        <li>
          <Link
            href="strike:lightning:lntb1500n1p3zygvtpp5grt3qkq0r4xkj8waa3qfaht9z3st6yg26vhd56gvx6v539ctjluqdpa2fjkzep6ypyjq6n4wd6zqen0w4hxggrwv94k2epqwp5kxgr0vcsyy6tvd35k2cqzpgxqr23ssp5g2c855rhpds50pf9uzv3yvgsch79te5f5cwpkljhlx7s7ggfdhas9qyyssqy27zdz3a4xgnyrwzhlqjwk2t54wp5kctllprcgxm2lx9xcssc2kpxztjsfvcadl9cgefftncrhrxyjs30ckgesun6d0frrerkwc9pngqzdvhj7"
            variant="brand"
          >
            strike:lightning:lntb1500n1p3zygvtpp5grt3qkq0r4xkj8waa3qfaht9z3st6yg26vhd56gvx6v539ctjluqdpa2fjkzep6ypyjq6n4wd6zqen0w4hxggrwv94k2epqwp5kxgr0vcsyy6tvd35k2cqzpgxqr23ssp5g2c855rhpds50pf9uzv3yvgsch79te5f5cwpkljhlx7s7ggfdhas9qyyssqy27zdz3a4xgnyrwzhlqjwk2t54wp5kctllprcgxm2lx9xcssc2kpxztjsfvcadl9cgefftncrhrxyjs30ckgesun6d0frrerkwc9pngqzdvhj7
          </Link>
        </li>
      </ul>
    </div>
  );
}
