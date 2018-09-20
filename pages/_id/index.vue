<template>
    <section class="container gap">
        <task :task="task"/>
    </section>
</template>

<script>
    export default {
        components: {
            Task: () => import('~/components/ui/Task')
        },
        fetch( { store, params } ) {
            store.commit( 'design/SET_BANNER', { title: `ID de la tâche : ${params.id}`, transition: true } );
        },
        async asyncData( { store, params } ) {
            return { task: await store.getters[ 'tasks/get_task' ]( params.id ) };
        }
    };
</script>
