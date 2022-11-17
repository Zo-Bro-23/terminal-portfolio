import { useRouter } from "next/router";
import { useEffect } from "react";

const linksObj = {
  github:
    "https://aarush-narang.github.io/portfolio/?utm_source=github&utm_medium=social&utm_campaign=proj_link",
  linkedin:
    "https://aarush-narang.github.io/portfolio/?utm_source=linkedin&utm_medium=social&utm_campaign=bio",
  instagram:
    "https://aarush-narang.github.io/portfolio/?utm_source=instagram&utm_medium=social&utm_campaign=bio",
};

const LINKS = new Map(Object.entries(linksObj));

// check what the link is from the slug and then redirect based on the LINKS object
export default function Redirect({}) {
  const router = useRouter();
  const { referrer } = router.query;

  useEffect(() => {
    if (LINKS.get(referrer)) {
      router.replace(LINKS.get(referrer));
    } else {
      router.replace(
        `https://aarush-narang.github.io/portfolio/?utm_source=${referrer}&utm_medium=unknown&utm_campaign=unknown`
      );
    }
  }, [referrer]);
}
