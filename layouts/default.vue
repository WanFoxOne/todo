<template>
    <div>
        <div
            class="full-popup fail"
            v-if="_get_connection_failure"></div>
        <header>
            <nav
                class="navbar is-white is-fixed-top"
                role="navigation"
                aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <nuxt-link
                            class="navbar-item"
                            to="/">
                            <img
                                src="~assets/imgs/logo.png"
                                alt="Logo"
                                height="28">
                        </nuxt-link>
                    </div>
                </div>
            </nav>
            <banner/>
        </header>

        <nuxt/>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        components: {
            Banner: () => import('~/components/ui/Banner')
        },
        computed: {
            ...mapGetters( {
                _get_connection_failure: `get_connection_failure`,
            } ),
        }
    };
</script>

<style lang="scss">

    html {
        padding-top: 3.25rem;;
    }

    header {

        > nav {
            box-shadow: 0 2px 3px transparentize(get-color('dark', 'black'), 0.9);
        }
    }

</style>
