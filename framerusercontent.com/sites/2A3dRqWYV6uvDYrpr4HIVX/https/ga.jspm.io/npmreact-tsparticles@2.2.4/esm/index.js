import t, {
    Component as s
} from "react";
import {
    tsParticles as i
} from "tsparticles-engine";
import e from "fast-deep-equal/react";
const a = "tsparticles";
class Particles extends s {
    constructor(t) {
        super(t);
        this.state = {
            init: false,
            library: void 0
        }
    }
    destroy() {
        if (this.state.library) {
            this.state.library.destroy();
            this.setState({
                library: void 0
            })
        }
    }
    shouldComponentUpdate(t) {
        return !e(t, this.props)
    }
    componentDidUpdate() {
        this.refresh()
    }
    forceUpdate() {
        this.refresh().then((() => {
            super.forceUpdate()
        }))
    }
    componentDidMount() {
        (async () => {
            this.props.init && await this.props.init(i);
            this.setState({
                init: true
            }, (async () => {
                await this.loadParticles()
            }))
        })()
    }
    componentWillUnmount() {
        this.destroy()
    }
    render() {
        const {
            width: s,
            height: i,
            className: e,
            canvasClassName: a,
            id: r
        } = this.props;
        return t.createElement("div", {
            className: e,
            id: r
        }, t.createElement("canvas", {
            className: a,
            style: Object.assign(Object.assign({}, this.props.style), {
                width: s,
                height: i
            })
        }))
    }
    async refresh() {
        this.destroy();
        await this.loadParticles()
    }
    async loadParticles() {
        var t, s, e;
        if (!this.state.init) return;
        const cb = async t => {
            this.props.container && (this.props.container.current = t);
            this.setState({
                library: t
            });
            this.props.loaded && await this.props.loaded(t)
        };
        const r = null !== (s = null !== (t = this.props.id) && void 0 !== t ? t : Particles.defaultProps.id) && void 0 !== s ? s : a,
            o = this.props.url ? await i.loadJSON(r, this.props.url) : await i.load(r, null !== (e = this.props.params) && void 0 !== e ? e : this.props.options);
        await cb(o)
    }
}
Particles.defaultProps = {
    width: "100%",
    height: "100%",
    options: {},
    style: {},
    url: void 0,
    id: a
};
export {
    Particles,
    Particles as
    default
};

//# sourceMappingURL=index.js.map