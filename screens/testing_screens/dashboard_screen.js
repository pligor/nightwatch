const create_project_button = by.css(".s12 >  .btn.waves-effect.waves-light")
const single_project_title = by.css(".card-title")
const single_project_description = by.css(".card-content > p")
// const project_cards = ss(by.css(".card"))
const single_project_edit_button = by.css("#btn_update_project")
const single_project_delete_button = by.css("#delete_project")
const single_project_add_task_button = by.css("#btn_add_task")
const single_project_view_tasks_button = by.css("#btn_view_tasks")

module.exports = {
    create_project_button,
    single_project_title,
    single_project_description,
    // project_cards,
    single_project_edit_button,
    single_project_delete_button,
    single_project_add_task_button,
    single_project_view_tasks_button,
}
