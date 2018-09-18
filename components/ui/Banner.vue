<template>
    <section
        class="hero is-danger"
        v-if="show_banner">
        <div class="hero-body">
            <div class="container">
                <h1
                    class="title"
                    v-if="title">
                    {{ title }}
                </h1>
                <h2
                    class="subtitle"
                    v-if="sub_title">
                    {{ sub_title }}
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Banner',
        computed: {
            title() {
                return this.$store.state.design.banner.title;
            },
            sub_title() {
                return this.$store.state.design.banner.sub_title;
            },
            show_banner() {
                return !!(this.title || this.sub_title);
            }
        }
    };
</script>

<style lang="scss" scoped>

    section {

        > .hero-body {
            padding: 2rem 1.5rem;

            h1.title,
            h2.subtitle {
                font-weight: 300;
            }
        }
    }

</style>
