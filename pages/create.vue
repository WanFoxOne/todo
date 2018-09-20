<template>
    <div>
        <task-form mode="create_task"/>
    </div>
</template>

<script>
    export default {
        components: {
            TaskForm: () => import('~/components/form/TaskForm')
        },
        fetch( { store } ) {
            store.commit( 'design/SET_BANNER', { title: 'Édition de la tâche', transition: true } );
        }
    };
</script>

