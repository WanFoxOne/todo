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
                <task 
                    title="Une tâche" 
                    completed="true"/>
            </div>
            <div class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                <task title="Une autre tâche"/>
            </div>
        </div>

    </section>
</template>

<script>
    import Task from '~/components/ui/Task';

    export default {
        components: {
            Task
        },
        fetch( { store, params } ) {

            // Set banner content
            store.commit( 'design/set_banner_content', {
                title: 'Liste des tâches'
            } );
        }
    };
</script>

<style lang="scss" scoped>

    @media all and (max-width: 1087px) {

        section {
            margin: 0 25px;
        }
    }

</style>

