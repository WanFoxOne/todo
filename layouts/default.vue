<template>
    <div>
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

        <!--<footer class="footer">
            <div class="content has-text-centered">
                <h3>
                    <strong>Fin des tâches</strong>.
                </h3>
            </div>
        </footer>-->
    </div>
</template>

<script>
    import Banner from '~/components/ui/Banner';

    export default {
        components: {
            Banner
        }
    };
</script>

<style lang="scss">

    html {
        padding-top: 3.25rem;;
    }

    header {

        > nav {
            box-shadow: 0 2px 3px hsla(0, 0%, 4%, .1);
        }
    }

</style>
