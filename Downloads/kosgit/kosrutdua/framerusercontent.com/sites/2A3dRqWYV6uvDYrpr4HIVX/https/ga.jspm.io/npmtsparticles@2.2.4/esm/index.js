import {
    loadAbsorbersPlugin as t
} from "tsparticles-plugin-absorbers";
import {
    loadEmittersPlugin as a
} from "tsparticles-plugin-emitters";
import {
    loadExternalTrailInteraction as r
} from "tsparticles-interaction-external-trail";
import {
    loadPolygonMaskPlugin as i
} from "tsparticles-plugin-polygon-mask";
import {
    loadRollUpdater as o
} from "tsparticles-updater-roll";
import {
    loadSlim as l
} from "tsparticles-slim";
import {
    loadTiltUpdater as p
} from "tsparticles-updater-tilt";
import {
    loadTwinkleUpdater as s
} from "tsparticles-updater-twinkle";
import {
    loadWobbleUpdater as e
} from "tsparticles-updater-wobble";
async function loadFull(m) {
    await l(m);
    await o(m);
    await p(m);
    await s(m);
    await e(m);
    await r(m);
    await t(m);
    await a(m);
    await i(m)
}
export {
    loadFull
};

//# sourceMappingURL=index.js.map