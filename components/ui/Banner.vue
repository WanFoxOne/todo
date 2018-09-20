<template>
    <section
        class="hero"
        v-show="_show_banner">
        <div
            class="hero-body"
            ref="hb">
            <div class="container">
                <h1
                    class="title"
                    v-if="buffer.title"
                    v-html="buffer.title">
                </h1>
                <h2
                    class="subtitle"
                    v-if="buffer.sub_title"
                    v-html="buffer.sub_title">
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Banner',
        data: () => ({
            buffer: null
        }),
        computed: {
            ...mapGetters( {
                _banner: `design/get_banner`
            } ),
            _show_banner() {
                return !!(this._banner.title || this._banner.sub_title);
            }
        },
        watch: {
            _banner() {
                if ( !this._show_banner ) return;

                if ( !this._banner.transition ) {
                    this.buffer = this._banner;
                    return;
                }

                const style = this.$refs.hb.style;
                style.transform = 'rotateY(-90deg)';
                style.opacity = 0;

                setTimeout( () => {
                    this.buffer = this._banner;

                    style.transform = 'rotateY(0deg)';
                    style.opacity = 1;
                }, 300 );
            }
        },
        created() {
            this.buffer = this._banner;
        }
    };
</script>

<style lang="scss" scoped>

    section.hero {
        background-color: get-color('dark', 'radical red');

        > .hero-body {
            padding: 2rem 1.5rem;
            transition: all 300ms;
            transform-origin: left center;

            h1.title,
            h2.subtitle {
                font-weight: 300;
                color: get-color('light', 'white');
            }
        }
    }

</style>
