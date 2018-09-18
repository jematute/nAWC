var hmContextIds = new Array();
function hmGetContextId(query) {
    var urlParams;
    var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    params = {};
    while (match = search.exec(query))
       params[decode(match[1])] = decode(match[2]);
    if (params["contextid"]) return decodeURIComponent(hmContextIds[params["contextid"]]);
    else return "";
}

hmContextIds["5300"]="awc_first_time_user.htm";
hmContextIds["131200"]="awc_first_time_user.htm";
hmContextIds["131252"]="awc_first_time_user.htm";
hmContextIds["2800"]="awc_user_settings.htm";
hmContextIds["2801"]="awc_user_settings.htm";
hmContextIds["4700"]="awc_ribbon.htm";
hmContextIds["4701"]="awc_ribbon.htm";
hmContextIds["32510"]="awc_ribbon_tab_document.htm";
hmContextIds["32500"]="awc_ribbon_tab_view.htm";
hmContextIds["31700"]="awc_introduction.htm";
hmContextIds["11100"]="awc_document_dashboard_tree.htm";
hmContextIds["2879"]="awc_document_dashboard_tabs.htm";
hmContextIds["10200"]="awc_document_dashboard_tabs.htm";
hmContextIds["23000"]="awc_document_dashboard_tabs.htm";
hmContextIds["23010"]="awc_document_dashboard_tabs.htm";
hmContextIds["23020"]="awc_document_dashboard_tabs.htm";
hmContextIds["23030"]="awc_document_dashboard_tabs.htm";
hmContextIds["23040"]="awc_document_dashboard_tabs.htm";
hmContextIds["23050"]="awc_document_dashboard_tabs.htm";
hmContextIds["23060"]="awc_document_dashboard_tabs.htm";
hmContextIds["23070"]="awc_document_dashboard_tabs.htm";
hmContextIds["23080"]="awc_document_dashboard_tabs.htm";
hmContextIds["13700"]="awc_create_relationships.htm";
hmContextIds["2600"]="awc_search_dialog_box.htm";
hmContextIds["2601"]="awc_search_dialog_box.htm";
hmContextIds["8600"]="awc_search_dialog_box.htm";
hmContextIds["26500"]="awc_search_file_content.htm";
hmContextIds["25900"]="awc_search_for_children.htm";
hmContextIds["2500"]="awc_data_card_intro.htm";
hmContextIds["2501"]="awc_data_card_intro.htm";
hmContextIds["326010"]="awc_current_work_area.htm";
hmContextIds["3900"]="awc_add_work_area.htm";
hmContextIds["3901"]="awc_add_work_area.htm";
hmContextIds["5200"]="awc_edit_work_area.htm";
hmContextIds["5201"]="awc_edit_work_area.htm";
hmContextIds["13200"]="awc_work_area_no_longer_valid.htm";
hmContextIds["14001"]="awc_work_area_no_longer_valid.htm";
hmContextIds["900"]="awc_create_new_documents.htm";
hmContextIds["901"]="awc_create_new_documents.htm";
hmContextIds["17020"]="awc_clear_extracted_info.htm";
hmContextIds["32561"]="awc_change_columns.htm";
hmContextIds["20500"]="awc_column_sets.htm";
hmContextIds["3301"]="awc_check_in_overview.htm";
hmContextIds["31710"]="awc_check_copy_out.htm";
hmContextIds["6100"]="awc_gatekeeper_verify_name.htm";
hmContextIds["6101"]="awc_gatekeeper_verify_name.htm";
hmContextIds["11900"]="awc_acquire_checkout.htm";
hmContextIds["1200"]="awc_release_checkout.htm";
hmContextIds["1201"]="awc_release_checkout.htm";
hmContextIds["3310"]="awc_undo_checkout_unchanged_children.htm";
hmContextIds["3000"]="awc_rename_files.htm";
hmContextIds["3001"]="awc_rename_files.htm";
hmContextIds["1100"]="awc_delete_files.htm";
hmContextIds["1101"]="awc_delete_files.htm";
hmContextIds["1701"]="awc_linked_record.htm";
hmContextIds["1501"]="awc_versions.htm";
hmContextIds["1500"]="awc_create_versions.htm";
hmContextIds["1300"]="awc_unassign_files.htm";
hmContextIds["1301"]="awc_unassign_files.htm";
hmContextIds["800"]="awc_assign_files.htm";
hmContextIds["801"]="awc_assign_files.htm";
hmContextIds["300"]="awc_approve_files.htm";
hmContextIds["301"]="awc_approve_files.htm";
hmContextIds["15700"]="awc_expedite_approve.htm";
hmContextIds["15900"]="awc_final_approve.htm";
hmContextIds["15500"]="awc_reject.htm";
hmContextIds["15800"]="awc_expedite_reject.htm";
hmContextIds["15600"]="awc_reject_to.htm";
hmContextIds["15910"]="awc_reset_to_start_of_workflow.htm";
hmContextIds["21500"]="awc_set_document_workflow.htm";
hmContextIds["21600"]="awc_reroute_workflow.htm";
hmContextIds["17130"]="awc_send_to.htm";
