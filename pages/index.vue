<template>
    <section class="container">

        <div class="columns is-multiline is-mobile">

            <template v-for="(item, index) of anchored_list">

                <!-- Divider -->
                <div
                    class="column is-full"
                    :key="index"
                    v-if="item.anchor">
                    <div
                        class="is-divider"
                        :data-content="item.anchor | capitalize"></div>
                </div>
                <!-- END Divider -->

                <!-- Task -->
                <div
                    class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                    :key="item.todo.id">
                    <task
                        :title="item.todo.title"
                        :completed="item.todo.completed"
                        :date="item.todo.date"/>
                </div>
                <!-- END Task -->

            </template>

        </div>

    </section>
</template>

<script>
    import Task from '~/components/ui/Task';

    export default {
        components: {
            Task
        },
        computed: {
            anchored_list() {
                const sorted_list = this.$store.getters[ 'todos/get_sorted_list' ];
                let result = [];
                let buffer = null;

                for ( const todo of sorted_list ) {

                    const anchor = () => {
                        const anchor = this.$moment( todo.date ).format( 'MMMM YYYY' );
                        console.log( anchor );
                        if ( !buffer || anchor !== buffer ) {
                            buffer = anchor;
                            return anchor;
                        }
                        return false;
                    };

                    result.push( {
                        anchor: anchor(),
                        todo
                    } );
                }
                return result;
            }
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

    section {
        padding: 20px 0 50px;
    }

    @media all and (max-width: 1087px) {

        section {
            margin: 0 25px;
        }
    }

</style>

