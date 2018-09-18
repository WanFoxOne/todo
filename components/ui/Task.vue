<template>
    <div class="card">
        <div class="card-content">
            <p
                class="title"
                :class="{completed}">{{ title }}</p>
            <p class="subtitle">
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </p>
        </div>
        <footer class="card-footer">
            <a
                href="#"
                class="card-footer-item">Éditer</a>
            <a
                href="#"
                class="card-footer-item">Valider</a>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'Task',
        props: {
            title: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style lang="scss" scoped>

    div.card {

        p.title {

            &.completed {
                color: #b0b0b0;
                text-decoration: line-through;
            }
        }
    }

</style>
