<template>
    <section
        class="hero is-danger"
        v-show="show_banner">
        <div
            class="hero-body"
            ref="hb">
            <div class="container">
                <h1
                    class="title"
                    v-if="banner.title"
                    v-html="banner.title">
                </h1>
                <h2
                    class="subtitle"
                    v-if="banner.sub_title"
                    v-html="banner.sub_title">
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Banner',
        data: () => ({
            banner: null
        }),
        computed: {
            _banner() {
                return this.$store.state.design.banner;
            },
            show_banner() {
                return !!(this.banner && (this.banner.title || this.banner.sub_title));
            }
        },
        watch: {
            _banner() {
                if(!this.$refs.hb) return;
                if(!this._banner.transition) {
                    this.banner = this._banner;
                    return
                }

                const style = this.$refs.hb.style;
                style.transform = 'rotateY(-90deg)';
                style.opacity = 0;

                setTimeout( () => {
                    this.banner = this._banner;

                    style.transform = 'rotateY(0deg)';
                    style.opacity = 1;
                }, 300 );
            }
        },
        created() {
            this.banner = this._banner;
        }
    };
</script>

<style lang="scss" scoped>

    section {

        > .hero-body {
            padding: 2rem 1.5rem;
            transition: all 300ms;
            transform-origin: left center;

            h1.title,
            h2.subtitle {
                font-weight: 300;
            }
        }
    }

</style>
