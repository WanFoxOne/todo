<template>
    <section class="container">

        <div class="timeline">

            <div class="timeline-item">
                <div class="timeline-marker is-primary"></div>
                <div class="timeline-content">
                    <p class="heading">Janvier 2018</p>
                    <p>18 tâches en attente, 5 réalisées</p>
                </div>
            </div>
        </div>

        <div class="columns is-multiline is-mobile">
            <div class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Faire les courses
                        </p>
                        <a
                            href="#"
                            class="card-header-icon"
                            aria-label="more options">
                            <span class="icon">
                                <i
                                    class="fas fa-angle-down"
                                    aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a
                            href="#"
                            class="card-footer-item">Save</a>
                        <a
                            href="#"
                            class="card-footer-item">Edit</a>
                        <a
                            href="#"
                            class="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
            <div class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Component
                        </p>
                        <a
                            href="#"
                            class="card-header-icon"
                            aria-label="more options">
                            <span class="icon">
                                <i
                                    class="fas fa-angle-down"
                                    aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a
                            href="#"
                            class="card-footer-item">Save</a>
                        <a
                            href="#"
                            class="card-footer-item">Edit</a>
                        <a
                            href="#"
                            class="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        fetch( { store, params } ) {

            // Set banner content
            store.commit( 'design/set_banner_content', {
                title: 'Liste des tâches'
            } );
        }
    };
</script>

<style lang="scss" scoped>
    section {

    }
</style>

