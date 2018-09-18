<template>
    <section class="container">

        <div
            class="is-divider"
            data-content="Janvier 2016"></div>

        <div class="columns is-multiline is-mobile">

            <div
                class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                v-for="todo of $store.state.todos.list"
                :key="todo.id">
                <task
                    :title="todo.title"
                    :completed="todo.completed"
                    :date="todo.date"/>
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
        },
        mounted() {
            console.log(this.$uniqid());
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

