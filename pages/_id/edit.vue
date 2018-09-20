<template>
    <task-form
        mode="update_task"
        :task="task"/>
</template>

<script>
    export default {
        components: {
            TaskForm: () => import('~/components/form/TaskForm')
        },
        fetch( { store, params } ) {
            store.commit( 'design/SET_BANNER', { title: 'Édition de la tâche', transition: true } );
        },
        async asyncData( { store, params } ) {
            return { task: Object.assign( {}, await store.getters[ 'tasks/get_task' ]( params.id ) ) };
        }
    };
</script>
