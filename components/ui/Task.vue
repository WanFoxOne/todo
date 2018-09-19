<template>
    <div
        class="card"
        :class="{'alert': isExpired(date)}">
        <div class="card-content">
            <p
                class="title"
                :class="{completed}">{{ title }}</p>
            <p class="subtitle">
                <time datetime="2016-1-1">{{ _date }}</time>
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
            date: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            _date() {
                const date = this.$moment( this.date );
                return date.format("DD MMMM YYYY");
            }
        },
        methods: {
            isExpired(date) {
                return (this.$moment(date) <= this.$moment());
            }
        }
    };
</script>

<style lang="scss" scoped>

    div.card {
        display: grid;
        grid-template-rows: 1fr auto;
        height: 100%;

        &.alert {
            border: 1px solid #ff3860;
            background-color: #ffc2c2;
            box-shadow: none;
            position: relative;
            @extend .halo;


            * {
                border-color: #ff3860;
            }
        }

        > div.card-content {
            display: grid;
            grid-template-rows: 1fr auto;
            grid-row-gap: 20px;
            height: 100%;

            > p {
                margin: 0;

                &.title {

                    &.completed {
                        color: #b0b0b0;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }

</style>
