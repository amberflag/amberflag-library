# 💛 amberflag-library

# 👩‍🔬 How to use it?

```

import { getDynamicAllFeaturesFlags, getStaticAllFeaturesFlags} from "amberflag-library";

await getStaticAllFeaturesFlags({
    key: your key,
    token: your token,
    env: <<the env you have deploye>>
})


await getDynamicAllFeaturesFlags({
    key: your key,
    token: your token,
    featureFlag: <<your feature flag>>
    env: <<the env you have deploye>>
    callback: (activated: boolean) => void
})


```
