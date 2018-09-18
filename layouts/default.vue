<template>
    <div>
        <header>
            <nav
                class="navbar is-white is-fixed-top"
                role="navigation"
                aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a
                            class="navbar-item"
                            href="https://bulma.io">
                            <img
                                src="~assets/imgs/logo.png"
                                alt="Logo"
                                height="28">
                        </a>

                        <a
                            role="button"
                            class="navbar-burger"
                            aria-label="menu"
                            aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
            </nav>
            <banner/>
        </header>

        <nuxt/>
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
