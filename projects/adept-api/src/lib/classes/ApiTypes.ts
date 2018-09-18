export module ApiTypes {
    export enum InvalidCode {
        eValid = 0,
    
        eStringTooLong,
    
        eStringContainsInvalidChar,
    }
    
    
    export enum DATE_FMT {
        UNKNOWN = -1,
        ADEPTSTD,
        YEAR_MONTH_DAY,
        ISO_UTC,
        ISO_LOCAL,
        DF_WINDOWS
    }
    
    export enum ItemListTypes {
        Invalid,
    
        DocList,
    
        ColList,
    
        LibList,
    
        MRUString,
    
        Search,
    
        UserList,
    
        TranSearch,
    
        Notify
    }
    
    
    export enum workflowSystemTables {
        workflowFileTable = 0,
    
        workflowRevTable
    }
    
    
    export enum STATEREL {
        STATEREL_FLOAT = 'T',
    
        STATEREL_FIX = 'X',
    
        STATEREL_WIP = 'W',
    
        STATEREL_DOCK = 'D',
    
        STATEREL_MISSING = 'M'
    }
    
    
    export enum ADEPTT_RTTREE_STYLE {
        RT_INVALID = -1,
    
        RT_EDIT = 0,
    
        RT_APPROVED,
    
        RT_WIP,
    
        RT_SYSTEM,
    
        RT_WHEREUSED = 100
    }
    
    
    export enum BLANK_EXTRACT {
        BLANK_EXTRACT_UNKNOWN = -1,
    
        BLANK_EXTRACT_NEVER,
    
        BLANK_EXTRACT_EXIST_IN_FILE,
    
        BLANK_EXTRACT_NOT_EXIST_IN_FILE
    }
    
    export enum RECSTATE_EXTRACTION {
        RECSTATE_UNDEFINED = ' ',
    
        RECSTATE_RUN = '0',
    
        RECSTATE_RAW = '1',
    
        RECSTATE_DONE = '2'
    }
    
    export enum XRITEM {
        XRITEM_IN = 'I',
    
        XRITEM_OUT = 'O',
    
        XRITEM_OUT_OTHER = 'T',
    
        XRITEM_HOLD = 'H',
    
        XRITEM_NEW = 'N',
    
        XRITEM_NEW_OTHER = 'E',
    
        XRITEM_UNAVAILABLE = 'U',
    
        XRITEM_REV = 'R',
    
        XRITEM_INFINITE = 'F',
    
        XRITEM_UNDEFINED = '?'
    }
    
    
    export enum XRSUBTYPE {
        XRSUBTYPE_OVERLAY = 'O',
    
        XRSUBTYPE_UNDERLAY = 'U',
    
        XRSUBTYPE_ALL = 'A',
    
        XRSUBTYPE_DIRECT = 'D',
    
        XRSUBTYPE_INCONTEXT = 'I',
    
        XRSUBTYPE_SUBSTITUTE = 'S',
    
        XRSUBTYPE_NONE = ' '
    }
    
    
    export enum XRSUBTYPEHANDLING {
        eUseSettings = 0,
    
        eStopResolving = 1,
    
        eContinueResolving = 2
    }
    
    
    export enum XR_CMD {
        XR_INVALID,
    
        XR_SAVE,
    
        XR_SIGNOUT,
    
        XR_SIGNIN,
    
        XR_REV,
    
        XR_ASSUME,
    
        XR_RELEASE,
    
        XR_COPY,
    
        XR_MOVE,
    
        XR_DELETE,
    
        XR_MANUAL,
    
        XR_EDITREV,
    
        XR_REPAIRGLYPHS,
    
        XR_RESETGLYPHS,
    
        XR_REPLACECHILD,
    
        XR_TESTRESOLVE,
    
        XR_APPROVE,
    
        XR_MAX
    }
    
    
    export enum ADEPTT_RESOLVETYPE {
        RESOLVE_NONE = 0,
    
        RESOLVE_SOFT = 1,
    
        RESOLVE_HARD = 2,
    
        RESOLVE_FORCEHARD = 3
    }
    
    
    export enum ADEPTT_ISPARENT {
        PARENT_MANUAL = '1',
    
        PARENT_MISSING = 'y',
    
        PARENT_YES = 'Y',
    
        PARENT_NO = ' ',
    
        CHILD_YES = 'T',
    
        CHILD_NO = ' '
    }
    
    export enum XREF_REVFIXOPTION {
        SYNCDEFAULTS_FLOATREVS = 0,
    
        SYNCDEFAULTS_FIXREVS = 1,
    
        SYNCDEFAULTS_DOCKREVS = 2
    }
    
    
    export enum OPFLAG {
        O_ARC = 'A',
    
        O_ASN_H = 'C',
    
        O_ASN_L = 'E',
    
        O_DUP = 'F',
    
        O_FINAL = 'G',
    
        O_HOLD = 'I',
    
        O_IN = 'K',
    
        O_LAU = 'M',
    
        O_LIB = 'O',
    
        O_NEW = 'Q',
    
        O_OUT = 'S',
    
        O_RES = 'U',
    
        O_UND = 'W'
    }
    
    
    export enum ADEPTT_FLD_DEF_TYPE {
        FDT_UNKNOWN = -1,
    
        FDT_CHARACTER,
    
        FDT_STRING,
    
        FDT_LOGICAL,
    
        FDT_INTEGER,
    
        FDT_DOUBLE,
    
        FDT_DATE,
    
        FDT_MEMO,
    
        FDT_DT_DATETIME,
    
        FDT_INT64
    }
    
    
    export enum ADEPT_FIELD_TYPE {
        F_EXTRACTION = 'E',
    
        F_CHAR = 'C',
    
        F_DATE = 'D',
    
        F_LOG = 'L',
    
        F_NUM = 'N',
    
        F_BIG_INT = 'H',
    
        F_MEMO = 'M',
    
        F_MEMO_BINARY = 'B',
    
        F_MEMO_TEXT = 'T',
    
        F_DEC = 'R',
    
        F_PROMPT = 'P',
    
        F_RESTR = 'R',
    
        F_SYSTEM = 'S',
    
        F_DT_DATETIME = 'Z'
    }
    
    
    export enum ADEPT_DATESEARCHTYPE {
        NO_DATE = -1,
    
        ON_DATE,
    
        AFTER_DATE,
    
        BEFORE_DATE,
    
        RANGE_DATE
    }
    
    
    export enum ADEPT_INFORMATIONSOURCE {
        NO_SOURCE = -1,
    
        APPROVED,
    
        WIP,
    
        WORKAREA
    }
    
    
    export enum ADEPTT_TBL_NUM {
        C_INVALID = 0,
    
        C_FILES = 1,
    
        C_LIBSIO,
    
        C_LIBDEST,
    
        C_LIBSEL,
    
        C_LIBLIST,
    
        C_USER,
    
        C_USERLIST,
    
        C_GROUP,
    
        C_TRUSTEE,
    
        C_TGTSEL,
    
        C_LOCAL,
    
        C_DESIGN,
    
        C_HISTORY,
    
        C_REVISION,
    
        C_MIXED,
    
        C_MASTER,
    
        C_ERROR,
    
        C_RELLOCAL,
    
        C_RELFILES,
    
        C_RELREV,
    
        C_WORKAREALIST,
    
        C_WORKAREA,
    
        C_INBOX,
    
        C_PLUGIN,
    
        C_GROUP_MEMBER,
    
        C_COMMAND_TRACE,
    
        C_COMMAND_STAT,
    
        C_FILETYPE,
    
        C_LAUNCH_APP,
    
        C_TEMPLATE,
    
        C_MEMO_FILES,
    
        C_MEMO_HISTORY,
    
        C_MEMO_LOCAL,
    
        C_MEMO_REVISION,
    
        C_LIB,
    
        C_TGT,
    
        C_CARDS,
    
        C_EXTRACTION,
    
        C_FIELDS,
    
        C_SCHEMA,
    
        C_TABLAYOUT,
    
        C_TABS,
    
        C_VIEWS,
    
        C_VAULT,
    
        C_WORKFLOW,
    
        C_WORKFLOWSTEP,
    
        C_WORKFLOWFILES,
    
        C_WORKFLOWREV,
    
        C_WORKFLOWTRUSTEE,
    
        C_FILESEXT,
    
        C_REVEXT,
    
        C_RESTRICTED,
    
        C_LOCKS,
    
        C_BADCOL,
    
        C_DELETED,
    
        C_VERSION,
    
        C_NOTIFY,
    
        C_WFFILA,
    
        C_WFREVA,
    
        C_WAFILE,
    
        C_FTSFMQ,
    
        C_TRANSMITTAL,
    
        C_JOBS,
    
        C_CONTACTS,
    
        C_DISTLISTS,
    
        C_COMPANIES,
    
        C_DISLISTMBR,
    
        C_TRNSTEMPLATE,
    
        C_FMTSEG,
    
        C_FORMAT,
    
        C_LIBPROPERTIES,
    
        C_LIBWORKFLOW,
    
        C_LANGUAGES,
    
        C_TRANSLATION,
    
        C_CONTAINERS,
    
        C_CONTAINERITEMS,
    
        C_SHARES,
    
        C_CONTROL,
    
        C_APIPR,
    
        C_CLIENTS,
    
        C_CONNECTION,
    
        C_FTSRESULTS,
    
        C_LIBRARYFILTER,
    
        C_REFRESHTOKENS,
    
        C_RFOPTIONS,
    
        C_RFREL,
    
        C_RFRELDATA,
    
        C_SETTINGS,
    
        C_USERSETTINGS,
    
        C_52DATA,
    
        C_LASTTABLE = C_52DATA
    }
    
    
    export enum ADEPTT_TBL_NUM_EXT {
        C_RFREL = 0,
    
        C_RFRELDATA,
    
        C_RFOPTIONS
    }
    
    export enum EXTENDED_PROPERTY_TYPE {
        UNDEFINED = -1,
    
        RELATED_FIELD = 0,
    
        AUTOFILL_FIELD = 1,
    
        ADDITIONAL_INFO = 2
    }
    
    
    export enum RELATED_FIELD_TYPE {
        Undefined = -1,
    
        SelectionList = 0,
    
        AutoFillField,
    
        InfoField
    }
    
    
    export enum ON_ACTION_NOTIFY {
        OAN_UNDEFINED = ' ',
    
        OAN_APPROVE = 'A',
    
        OAN_TIMEOUT = 'T'
    }
    
    
    export enum ADLINKTYPE {
        LT_UNKNOWN = ' ',
    
        LT_LINKED = 'L',
    
        LT_UNLINKED = 'U',
    
        LT_LINKABLE = '?'
    }
    
    
    export enum SELECTION_LIST_MODE {
        SL_WIP,
    
        SL_APPROVED,
    
        SL_FIX
    }
    
    
    export enum SELECTION_LIST_ORDER {
        SL_FILENAME,
    
        SL_SORT_VAL,
    
        SL_AS_ADDED
    }
    
    
    export enum ADEPT_MEMO_TYPES {
        MT_UNKNOWN = '#',
    
        MT_THUMBNAIL = 'P',
    
        MT_REDLINE = 'R',
    
        MT_OLDREDLINE = 'O',
    
        MT_TEXT = 'T',
    
        MT_API = 'A'
    }
    
    
    export enum ADEPT_MEMO_SUBTYPES {
        MT_SUBTYPE_UNKNOWN = '#',
    
        MT_THUMBNAIL_BITMAP = 'B',
    
        MT_THUMBNAIL_METAFILE = 'M',
    
        MT_THUMBNAIL_ENHMETAFILE = 'E',
    
        MT_TEXT_RICHTEXT = 'R',
    
        MT_TEXT_ZIPPED_RICHTEXT = 'Z',
    
        MT_TEXT_HTMLTEXT = 'H'
    }
    
    
    export enum ADEPTT_RIGHTS {
        P_FIRST,
    
        P_SO = P_FIRST,
    
        P_COPY,
    
        P_EDIT,
    
        P_VIEW,
    
        P_RDL,
    
        P_MOVE,
    
        P_RENAME,
    
        P_DELETE,
    
        P_CHECK,
    
        P_ASSIGN,
    
        P_PRINT,
    
        P_EDIT_PROT,
    
        P_ASSY_REV,
    
        P_REV_ASSY_REV,
    
        P_GROUPFILES,
    
        P_UPDATE_DOC,
    
        P_SI,
    
        P_VIEW_HOLD,
    
        P_CONVERT_VIEWER,
    
        P_LIBADMIN,
    
        P_DELRDL,
    
        P_LAST = P_DELRDL,
    
        P_NOT_DEFINED
    }
    
    export enum TABLE_GROUP_NUMBER {
        TGN_UNKNOWN = -1,
    
        TGN_MSTR,
    
        TGN_SCHEMA,
    
        TGN_VIEWS,
    
        TGN_VL,
    
        TGN_WA,
    
        TGN_WF,
    
        TGN_PLUGINS,
    
        TGN_LOGIN_MISC,
    
        TGN_TLF,
    
        TGN_LIBCARDS,
    
        TGN_DOCTBLS,
    
        TGN_PROJECT_MISC,
    
        TGN_GU,
    
        TGN_USER,
    
        TGN_CACHE,
    
        TGN_TRANSMITTAL,
    
        TGN_LISTCACHE,
    
        TGN_MISC,
    
        TGN_LAST
    }
    
    export enum WORKFLOW_USER_TYPE {
        WFUT_UNDEFINED = ' ',
    
        WFUT_KEY = 'K',
    
        WFUT_GROUP = 'G',
    
        WFUT_USER = 'U',
    
        WFUT_EMAIL = 'E',
    
        WFUT_APPROVERS = 'A'
    }
    
    
    export enum TRANSLATION_CATEGORY {
        TC_OPTIONS = 0,
    
        TC_COLUMNS,
    
        TC_FILEGUIDES,
    
        TC_LIBRARYCARDS
    }
    
    export enum ADEPTT_MEMBERTYPE {
        MEMBERTYPE_INVALID = '#',
    
        MEMBERTYPE_USER = 'U',
    
        MEMBERTYPE_USERLIST = 'L',
    
        MEMBERTYPE_SEARCH = 'S',
    
        MEMBERTYPE_TRSEARCH = 'H',
    
        MEMBERTYPE_LIBSET = 'T',
    
        MEMBERTYPE_COLSET = 'C',
    
        MEMBERTYPE_FILETMPL = 'F',
    
        MEMBERTYPE_TRTMPL = 'M',
    
        MEMBERTYPE_RPTTMPL = 'R',
    
        MEMBERTYPE_FAVORITE = 'V',
    
        MEMBERTYPE_API = 'A',
    
        MEMBERTYPE_WF = 'W'
    }
    
    export enum AdeptCommandNumber {
        ACN_UNKNOWN = -1,
    
        ACN_SET_FILE_TYPE = 100,
    
        ACN_SIGN_IN = 101,
    
        ACN_SIGN_OUT = 102,
    
        ACN_COPY = 103,
    
        ACN_MOVE = 104,
    
        ACN_DELETE = 105,
    
        ACN_RENAME = 106,
    
        ACN_RELEASE_OWNERSHIP = 107,
    
        ACN_SEND_TO = 108,
    
        ACN_PRINT_FILES = 109,
    
        ACN_BATCH_UPDATE = 110,
    
        ACN_CLEAR_EXTRACTED_INFO = 111,
    
        ACN_EXTRACT = 112,
    
        ACN_UPDATE_FILES = 113,
    
        ACN_BATCH_OPEN_AND_SAVE = 113,
    
        ACN_VIEW_FILES = 114,
    
        ACN_LAUNCH = 115,
    
        ACN_CLEAR_EXTRACT_STATE = 116,
    
        ACN_CLEAR_TAGS = 117,
    
        ACN_ARCHIVE = 118,
    
        ACN_RESTORE = 119,
    
        ACN_APPROVE = 120,
    
        ACN_ASSIGN = 121,
    
        ACN_UNASSIGN = 122,
    
        ACN_CREATE_REVISION = 123,
    
        ACN_CLEAR_REDLINES = 124,
    
        ACN_LINK = 125,
    
        ACN_UNLINK = 126,
    
        ACN_ASSUME_OWNERSHIP = 127,
    
        ACN_EXPEDITOR_APPROVE = 128,
    
        ACN_REJECT = 129,
    
        ACN_REJECT_TO = 130,
    
        ACN_EXPEDITOR_REJECT = 131,
    
        ACN_ASSIGN_WORKFLOW = 132,
    
        ACN_SET_DEFAULT_WORKFLOW = 133,
    
        ACN_ROLLBACK_REVISION = 134,
    
        ACN_NEW = 135,
    
        ACN_UPDATE_DOCUMENT = 136,
    
        ACN_EXTRACT_TEXT = 137,
    
        ACN_AUTO_ADVANCE = 138,
    
        ACN_WORKFLOW_SYSTEM_PLACEHOLDER = 139,
    
        ACN_RELEASE_UNCHANGED_CHILDREN = 140,
    
        ACN_REFRESH_FILE_SIZE = 141,
    
        ACN_FINAL_APPROVE = 142,
    
        ACN_RESTART_WORKFLOW = 143,
    
        ACN_CREATE_DUPLICATES_TABLE = 200,
    
        ACN_START_PROGRAM = 201,
    
        ACN_WORKFLOW_DEF_MANAGER = 300
    }
    
    
    export enum AUDIT_TRAIL_FILTER_GROUP {
        ATFG_INVALID,
    
        ATFG_VIEW_FILE,
    
        ATFG_VIEW_REDLINE,
    
        ATFG_EDIT_SIGNOUT,
    
        ATFG_EDIT_DATACARD,
    
        ATFG_EDIT_LAUNCH,
    
        ATFG_EDIT_REL,
    
        ATFG_EDIT_OTHER,
    
        ATFG_WORKFLOW,
    
        ATFG_WF_OTHER,
    
        ATFG_DOC_MANAGE,
    
        ATFG_DOC_ARCHIVE,
    
        ATFG_UPDATE_DOC,
    
        ATFG_ADMIN_UGL,
    
        ATFG_ADMIN_WF,
    
        ATFG_ADMIN_FIELDS,
    
        ATFG_ADMIN_OTHER,
    
        ATFG_LOGINOUT,
    
        ATFG_OTHER,
    
        ATFG_TRANSMITTAL,
    
        ATFG_SERVER_BG_WF,
    
        ATFG_SERVER_BG_AD
    }
    
    export enum AUDIT_TRAIL_COMMAND_GROUP {
        CHG_VIEW_GROUP = 1,
    
        CHG_EDIT_GROUP,
    
        CHG_CHECKING_GROUP,
    
        CHG_DOC_MANAGE_GROUP,
    
        CHG_ADMIN_GROUP,
    
        CHG_MISC_GROUP,
    
        CHG_LOGINOUT,
    
        CHG_RM_BIG,
    
        CHG_RM_MEDIUM,
    
        CHG_RM_SMALL,
    
        CHG_PI_GROUP,
    
        CHG_TRANSMITTAL_GROUP,
    
        CHG_LISTS_GROUP,
    
        CHG_SERVER_BG_TASK,
    
        CHG_CP
    }
    
    
    export enum VIEWER_TYPES {
        NOTCONFIGURED = -1,
    
        AUTOVUE = 0,
    
        LOCAL = 1
    }
    
    export enum AUDIT_TRAIL_COMMAND_NUMBER {
        CHN_INVALID = 0,
    
        CHN_FILE__NEW = 1,
    
        CHN_FILE__SET_FILE_TYPE,
    
        CHN_FILE__SIGN_IN,
    
        CHN_FILE__SIGN_OUT,
    
        CHN_FILE__COPY,
    
        CHN_FILE__MOVE,
    
        CHN_FILE__DELETE,
    
        CHN_FILE__RENAME,
    
        CHN_FILE__LINK,
    
        CHN_FILE__UNLINK,
    
        CHN_FILE__RELEASE_OWNERSHIP,
    
        CHN_FILE__ASSUME_OWNERSHIP,
    
        CHN_FILE__SEARCH_FOR_DUPLICATES_OF_THIS,
    
        CHN_FILE__SEND_LINKS_TO_FILE,
    
        CHN_FILE__SEND_LINKS_TO_EMAIL_RECIPIENT,
    
        CHN_FILE__SEND_FILES_TO_EMAIL_RECIPIENT,
    
        CHN_FILE__PRINT_FILES,
    
        CHN_FILE__PRINT_SETUP,
    
        CHN_FILE__PRINT_PREVIEW,
    
        CHN_FILE__PRINT_LIST_WINDOW,
    
        CHN_FILE__SAVE_LIST_WINDOW,
    
        CHN_FILE__CHANGE_DATABASE,
    
        CHN_FILE__LOG_OUT_OF_DOMAIN,
    
        CHN_FILE__CONFIGURE_DATA_SOURCES,
    
        CHN_FILE__EXIT,
    
        CHN_FILE__SAVE_DRAWING_INFO_AS_TEXT,
    
        CHN_FILE__LOGIN,
    
        CHN_FILE__SENDTO,
    
        CHN_EDIT__ADD_TO_FAVORITES,
    
        CHN_EDIT__REMOVE_FROM_FAVORITES,
    
        CHN_EDIT__CLEAR_FAVORITES,
    
        CHN_EDIT__REMOVE_FROM_RECENTLY_USED,
    
        CHN_EDIT__CLEAR_RECENTLY_USED,
    
        CHN_EDIT__CREATE_RELATIONSHIPS,
    
        CHN_EDIT__EDIT_RELATIONSHIPS,
    
        CHN_EDIT__DELETE_RELATIONSHIPS,
    
        CHN_EDIT__ADD_WORK_AREA,
    
        CHN_EDIT__RENAME_WORK_AREA,
    
        CHN_EDIT__REPATH_WORK_AREA,
    
        CHN_EDIT__REMOVE_WORK_AREA,
    
        CHN_EDIT__SET_ACTIVE_WORK_AREA,
    
        CHN_EDIT__BATCH_UPDATE,
    
        CHN_EDIT__SELECT_ALL,
    
        CHN_EDIT__CLEAR_EXTRACTED_FILE_INFO,
    
        CHN_EDIT__REFRESH_EXTRACTED_FILE_INFO,
    
        CHN_EDIT__RESET_EXTRACTED_FILE_INFO,
    
        CHN_EDIT__OPTIONS,
    
        CHN_EDIT__UPDATE_FILES,
    
        CHN_EDIT__MAKE_SURE_WORKAREA_PRESENT,
    
        CHN_EDIT__BATCH_OPEN_AND_SAVE,
    
        CHN_EDIT__REPLACE_CHILD,
    
        CHN_VIEW__CREATE_DATA_CARD,
    
        CHN_VIEW__CANCEL_DATA_CARD,
    
        CHN_VIEW__UPDATE_DATA_CARD,
    
        CHN_VIEW__VIEW_FILE,
    
        CHN_VIEW__VIEW_FAVORITES,
    
        CHN_VIEW__VIEW_RECENTLY_USED,
    
        CHN_VIEW__VIEW_WORK_AREA_WINDOW,
    
        CHN_VIEW__VIEW_FILE_GUIDE_WINDOW,
    
        CHN_VIEW__VIEW_INBOX_WINDOW,
    
        CHN_VIEW__VIEW_SEARCH_RESULTS_WINDOW,
    
        CHN_VIEW__VIEW_RELATIONSHIP_BROWSER_WINDOW,
    
        CHN_VIEW__SEND_TO_RELATIONSHIP_BROWSER,
    
        CHN_VIEW__VIEW_CHAT_WINDOW,
    
        CHN_VIEW__VIEW_SWA_MEMBERS,
    
        CHN_LAUNCH__LAUNCH_DEFAULT,
    
        CHN_LAUNCH__LAUNCH_APPLICATION,
    
        CHN_LAUNCH__LAUNCH_UNRESTRICTED,
    
        CHN_LAUNCH__LAUNCH_CUSTOM,
    
        CHN_LAUNCH__START_PROGRAM,
    
        CHN_SEARCH__SEARCH_FILES_TABLE,
    
        CHN_SEARCH__SEARCH_REVISIONS_TABLE,
    
        CHN_SEARCH__SEARCH_HISTORY_TABLE,
    
        CHN_SEARCH__SHOW_REVISIONS_OF_THIS,
    
        CHN_SEARCH__SHOW_HISTORY_OF_THIS,
    
        CHN_SEARCH__SEARCH_FOR_ALL_CHILDREN_OF_THIS,
    
        CHN_ADMIN__SYSTEM_ADMINISTRATION,
    
        CHN_ADMIN__CONFIGURE_FILE_TYPES,
    
        CHN_ADMIN__PACKAGE_DATABASE,
    
        CHN_ADMIN__LOCK_SYSTEM,
    
        CHN_ADMIN__UNLOCK_SYSTEM,
    
        CHN_ADMIN__EMAIL_BROADCAST,
    
        CHN_ADMIN__SEARCH_FOR_DUPLICATE_FILENAMES,
    
        CHN_ADMIN__SEARCH_FOR_REVISIONS_OVER_LIBRARY_REVISION_DEPTH,
    
        CHN_ADMIN__SEARCH_FOR_FILES_WITH_UNRESOLVED_RELATIONSHIPS,
    
        CHN_ADMIN__VERIFY_FILE_LINKAGE,
    
        CHN_ADMIN__VIEW_SYSTEM_LOG,
    
        CHN_ADMIN__VIEW_INSTALLATION_MANUAL,
    
        CHN_ADMIN__VIEW_ADMINISTRATION_MANUAL,
    
        CHN_ADMIN__RESET_EXTRACT_FLAGS,
    
        CHN_ADMIN__CLEAR_TAGS,
    
        CHN_ADMIN__INDEX_TABLES_FOR_PARENTS_AND_CHILDREN,
    
        CHN_ADMIN__SET_FLOAT,
    
        CHN_ADMIN__SET_FIX,
    
        CHN_ADMIN__SWA_ADMIN,
    
        CHN_ADMIN__PLUG_IN_MGR,
    
        CHN_ADMIN__CONFIG_WORKFLOW,
    
        CHN_ADMIN__CONFIGURE_FIELDS,
    
        CHN_ADMIN__COUNT_CURRENT_LOGINS,
    
        CHN_ADMIN__ADD_USER,
    
        CHN_ADMIN__EDIT_USER,
    
        CHN_ADMIN__DELETE_USER,
    
        CHN_ADMIN__DISABLE_USER,
    
        CHN_ADMIN__ENABLE_USER,
    
        CHN_ADMIN__ASSIGN_USER_TO_GROUP,
    
        CHN_ADMIN__REMOVE_USER_FROM_GROUP,
    
        CHN_ADMIN__CLEAR_USER_PREFERENCE,
    
        CHN_ADMIN__CHANGE_USER_PASSWORD,
    
        CHN_ADMIN__ADD_GROUP,
    
        CHN_ADMIN__DELETE_GROUP,
    
        CHN_ADMIN__MODIFY_GROUP,
    
        CHN_ADMIN__ASSIGN_GROUP_TO_LIB,
    
        CHN_ADMIN__REMOVE_GROUP_FROM_LIB,
    
        CHN_ADMIN__ADD_LIBRARY,
    
        CHN_ADMIN__EDIT_LIBRARY,
    
        CHN_ADMIN__DELETE_LIBRARY,
    
        CHN_ADMIN__CHANGE_LIBRARY_RIGHTS,
    
        CHN_ADMIN__SYSTEM_REPORT,
    
        CHN_ADMIN__USER_RIGHTS_REPORT,
    
        CHN_ADMIN__LOGIN_REPORT,
    
        CHN_ADMIN__SCAN_DIRECTORY,
    
        CHN_ADMIN__SYNCHRONIZE,
    
        CHN_ADMIN__VAULT_EDITOR_ADD,
    
        CHN_ADMIN__VAULT_EDITOR_REMOVE,
    
        CHN_ADMIN__VAULT_EDITOR_EDIT,
    
        CHN_ADMIN__ASSIGN_WORKFLOW_TO_LIB,
    
        CHN_ADMIN__CHANGED_ADMIN_OPTIONS,
    
        CHN_ARCHIVE__ARCHIVE,
    
        CHN_ARCHIVE__RESTORE,
    
        CHN_CHECKER__APPROVE,
    
        CHN_CHECKER__ASSIGN,
    
        CHN_CHECKER__UNASSIGN,
    
        CHN_CHECKER__CREATE_REVISION,
    
        CHN_CHECKER__DELETE_REVISION,
    
        CHN_CHECKER__DELETE_FROM_HOLD,
    
        CHN_CHECKER__CLEAR_REDLINES,
    
        CHN_CHECKER__EXPEDITOR_APPROVE,
    
        CHN_CHECKER__REJECT,
    
        CHN_CHECKER__REJECT_TO,
    
        CHN_CHECKER__EXPEDITOR_REJECT,
    
        CHN_CHECKER__ASSIGN_WORKFLOW,
    
        CHN_CHECKER__SET_DEFAULT_WORKFLOW,
    
        CHN_CHECKER__ROLLBACK_REVISION,
    
        CHN_ADMIN__SET_DOCK,
    
        CHN_VIEW__UPDATE_DOC_DATA_CARD,
    
        CHN_EDIT__REDLINE_FILE,
    
        CHN_EDIT__GET_PATH,
    
        CHN_ADMIN__ADB_REPORT,
    
        CHN_ADMIN__OUT_FILE_REPORT,
    
        CHN_ADMIN__HOLD_FILE_REPORT,
    
        CHN_ADMIN__DELETED_FILE_REPORT,
    
        CHN_ADMIN__ADDED_FILE_REPORT,
    
        CHN_ADMIN__ADMIN_SWA,
    
        CHN_ADMIN__EDIT_WORKFLOW,
    
        CHN_CHECKER_CHANGE_REV_RELATIONSHIP,
    
        CHN_FILE__SEND_FILES_TO_ZIP,
    
        CHN_ADMIN__BUMP_VERSION,
    
        CHN_ADMIN__WORKFLOW_REPORT,
    
        CHN_CHECKER_SET_WIP,
    
        CHN_ADMIN__DELETE_WORKFLOW,
    
        CHN_ADMIN_ADMIN_LOCAL_DATA_CACHE,
    
        CHN_ADMIN__CREATE_WORKFLOW,
    
        CHN_ARCHIVE_AUDITTRAIL,
    
        CHN_AUTO_ADVANCE,
    
        CHN_FTS_REFRESH,
    
        CHN_WF_ALERT,
    
        CHN_FTS_REPORT,
    
        CHN_FILE__SENT_TO_PRINTWAVE,
    
        CHN_FILE_PUBLISHED_PUBLISHWAVE,
    
        CHN_FILE_PUBLISHED_MANUAL,
    
        CHN_VIEW__UPDATE_DATA_CARD_OVERRIDE,
    
        CHN_PI_CREATE_FILE_TRANSMITTAL,
    
        CHN_PI_INCLUDED_IN_TRANSMITTAL,
    
        CHN_PI_CREATE_FILE_BOM,
    
        CHN_PI_GENERIC,
    
        CHN_FILE__LOGIN_FROM_AE,
    
        CHN_LA_UNLINK_USER_FROM_AD,
    
        CHN_LA_LINK_USER_TO_AD,
    
        CHN_ADMIN__IMPORT_USER_FROM_AD,
    
        CHN_ADMIN__IMPORT_GROUP_FROM_AD,
    
        CHN_ADMIN__REPLACE_USER_FROM_AD,
    
        CHN_ADMIN__UPDATE_USER_FROM_AD,
    
        CHN_SERVER_AD_USER_IMPORTED,
    
        CHN_SERVER_AD_USER_PROP_UPDATE,
    
        CHN_SERVER_AD_USER_DISABLED,
    
        CHN_SERVER_AD_USER_DELETED,
    
        CHN_SERVER_AD_GROUP_PROP_UPDATE,
    
        CHN_SERVER_AD_GROUP_DISABLED,
    
        CHN_SERVER_AD_GROUP_DELETED,
    
        CHN_SERVER_AD_GROUP_MEMBER_CHANGE,
    
        CHH_AD_START_RESTART_POLLING,
    
        CHH_AD_STOP_POLLING,
    
        CHH_AD_SYNCHRONIZE_NOW,
    
        CHN_LA_UNLINK_GROUP_FROM_AD,
    
        CHN_LA_LINK_GROUP_TO_AD,
    
        CHN_ADMIN_CLEAR_FTS_QUEUE,
    
        CHN_CHECKER__FINAL_APPROVE,
    
        CHN_COPY_DATA_CARD_PASTE,
    
        CHN_TRAN_TRANS_TABLE_ADDFIELD,
    
        CHN_TRAN_TRANS_TABLE_DELFIELD,
    
        CHN_TRAN_TRANS_TABLE_MODFIELD,
    
        CHN_TRAN_JOB_TABLE_ADDFIELD,
    
        CHN_TRAN_JOB_TABLE_DELFIELD,
    
        CHN_TRAN_JOB_TABLE_MODFIELD,
    
        CHN_TRAN_NEW_TRANSMITTAL,
    
        CHN_TRAN_ATTACH_ADDDOC,
    
        CHN_TRAN_ATTACH_REMOVEDOC,
    
        CHN_TRAN_TEMPLATE_NEW,
    
        CHN_TRAN_TEMPLATE_EDIT,
    
        CHN_TRAN_TEMPLATE_DELETE,
    
        CHN_TRAN_TEMPLATE_COPY,
    
        CHN_TRAN_COMPANY_ADD,
    
        CHN_TRAN_COMPANY_EDIT,
    
        CHN_TRAN_COMPANY_DELETE,
    
        CHN_TRAN_CLIENT_ADD,
    
        CHN_TRAN_CLIENT_EDIT,
    
        CHN_TRAN_CLIENT_DELETE,
    
        CHN_TRAN_CCLIST_ADD,
    
        CHN_TRAN_CCLIST_EDIT,
    
        CHN_TRAN_CCLIST_DELETE,
    
        CHN_TRAN_JOBS_ADD,
    
        CHN_TRAN_JOBS_EDIT,
    
        CHN_TRAN_JOBS_DELETE,
    
        CHN_TRAN_TRANSMITTAL_EDIT,
    
        CHN_TRAN_SEND_TRANSMITTAL,
    
        CHN_TRAN_ADMIN_REPORT,
    
        CHN_TRAN_VIEWPDF,
    
        CHN_TRAN_CHANGE_TEMPLATE,
    
        CHN_REPAIR_DB_GREV,
    
        CHN_REPAIR_DB_PRUNE_REC,
    
        CHN_REPORT_TEMPLATE_NEW,
    
        CHN_REPORT_TEMPLATE_EDIT,
    
        CHN_REPORT_TEMPLATE_DELETE,
    
        CHN_REPORT_TEMPLATE_COPY,
    
        CHN_REPORT_USE_TEMPLATE,
    
        CHN_SHARE_TRANSMITTAL_SEARCH,
    
        CHN_SHARE_TRANSMITTAL_TEMPATE,
    
        CHN_SHARE_REPORT_TEMPLATES,
    
        CHN_SHARE_SAVED_SEARCH,
    
        CHN_SHARE_COLUMN_SET,
    
        CHN_SHARE_LIBRARY_SET,
    
        CHN_SHARE_PERSONAL_GROUP,
    
        CHN_SHARE_FAVORITE_LIST,
    
        CHN_LIST_CREATE_TRANSMITTAL_SEARCH,
    
        CHN_LIST_CREATE_TRANSMITTAL_TEMPATE,
    
        CHN_LIST_CREATE_REPORT_TEMPLATES,
    
        CHN_LIST_CREATE_SAVED_SEARCH,
    
        CHN_LIST_CREATE_COLUMN_SET,
    
        CHN_LIST_CREATE_LIBRARY_SET,
    
        CHN_LIST_CREATE_PERSONAL_GROUP,
    
        CHN_LIST_CREATE_FAVORITE_LIST,
    
        CHN_LIST_EDIT_TRANSMITTAL_SEARCH,
    
        CHN_LIST_EDIT_TRANSMITTAL_TEMPATE,
    
        CHN_LIST_EDIT_REPORT_TEMPLATES,
    
        CHN_LIST_EDIT_SAVED_SEARCH,
    
        CHN_LIST_EDIT_COLUMN_SET,
    
        CHN_LIST_EDIT_LIBRARY_SET,
    
        CHN_LIST_EDIT_PERSONAL_GROUP,
    
        CHN_LIST_EDIT_FAVORITE_LIST,
    
        CHN_LIST_DELETE_TRANSMITTAL_SEARCH,
    
        CHN_LIST_DELETE_TRANSMITTAL_TEMPATE,
    
        CHN_LIST_DELETE_REPORT_TEMPLATES,
    
        CHN_LIST_DELETE_SAVED_SEARCH,
    
        CHN_LIST_DELETE_COLUMN_SET,
    
        CHN_LIST_DELETE_LIBRARY_SET,
    
        CHN_LIST_DELETE_PERSONAL_GROUP,
    
        CHN_LIST_DELETE_FAVORITE_LIST,
    
        CHN_VL_FILE_MISMATCH_SIZE,
    
        CHN_FILE__LOGIN_FROM_WEB_REVIEWER,
    
        CHN_TRANSMITTAL_SEND_FAIL,
    
        CHN_ADM_CIRCLE_ENABLE,
    
        CHN_ADM_CIRCLE_DISABLE,
    
        CHN_TRAN_TEMPLATE_RENAME,
    
        CHN_REPORT_TEMPLATE_RENAME,
    
        CHN_AT_REPORT_TEMPLATE_RENAME,
    
        CHN_CP_1,
    
        CHN_ADM_RENAME_LIBRARY,
    
        CHN_ADM_PASTE_RIGHT,
    
        CHN_ADM_PASTE_PROP,
    
        CHN_ADM_PASTE_WF,
    
        CHN_ADM_PASTE_AFS,
    
        CHN_ADM_MOVE_LIB_BRANCH,
    
        CHN_ADM_SET_INHERIT_RIGHT,
    
        CHN_ADM_SET_INHERIT_PROP,
    
        CHN_ADM_SET_INHERIT_WF,
    
        CHN_ADM_SET_INHERIT_AFS,
    
        CHN_ADM_CLEAR_RIGHT,
    
        CHN_ADM_CLEAR_PROP,
    
        CHN_ADM_CLEAR_WF,
    
        CHN_ADM_CLEAR_AFS,
    
        CHN_ADM_SET_LIBRARY_RIGHT,
    
        CHN_ADM_SET_LIBRARY_PROP,
    
        CHN_ADM_SET_LIBRARY_WF,
    
        CHN_ADM_SET_LIBRARY_AFS,
    
        CHN_SERVER_AD_USER_REPLACE_USER,
    
        CHN_ADM_SET_INHERIT_ALL,
    
        CHN_ADM_CLEAR_ALL,
    
        CHN_FILE__RELEASE_UNCHANGED_CHILDREN,
    
        CHN_FILE__UNDO_SIGNOUT,
    
        CHN_ADM_CHANGED_ADM_OPTION,
    
        CHN_SUPERSEDE_DOC,
    
        CHN_ADM_DELETE_ALL_EMPTY_LIBS,
    
        CHN_FILE__LOGIN_FROM_TASK_PANE,
    
        CHN_FILE__LOGIN_FROM_WEBAPI,
    
        CHN_FILE__LOGIN_FROM_P2A,
    
        CHN_FILE__LOGIN_FROM_WEB_CREATOR,
    
        CHN_LOGIN_NOT_ENOUGH_SEATS_ADC,
    
        CHN_LOGIN_NOT_ENOUGH_SEATS_AE,
    
        CHN_LOGIN_NOT_ENOUGH_SEATS_AR,
    
        CHN_LOGIN_NOT_ENOUGH_SEATS_CREATOR,
    
        CHN_NUMBER_OF_OPERATION_CODES
    }
    
    
    export enum WA_SWA {
        WA_SWAUNSHARED = ' ',
    
        WA_SWAPARENT = 'P',
    
        WA_SWACHILD = 'C'
    }
    
    
    export enum WA_DRIVETYPE {
        WA_DRIVEUNKNOWN = ' ',
    
        WA_DRIVEREMOVABLE = 'R',
    
        WA_DRIVELOCAL = 'L',
    
        WA_DRIVENETWORK = 'N'
    }
    
    
    export enum FTS_OPERATION {
        FTS_ADDDOCUMENT = 0,
    
        FTS_DELETEDOCUMENTS,
    
        FTS_DELETELIBIDDOCUMENTS,
    
        FTS_DELETEREVISIONDOCUMENTS,
    
        FTS_COPYDOCUMENT,
    
        FTS_MINORREVS,
    
        FTS_UPDATEGREV,
    
        FTS_UPDATELIBID
    }
    
    export class ApiTypes {
        public static DES_CONVERT_FUNC: string = "ADEPT110_CONVERT";
        public static AD_LIBFILTER_PROC: string = "ADEPT110_LIBRARYFILTEREX";
        public static AD_RIGHTLEVEL_PROC: string = "ADEPT110_RIGHTLEVELEX";
        public static AD_INBOXREVIEW_PROC: string = "ADEPT110_INBOXREVIEWEX";
        public static AD_GETANCESTORS_PROC: string = "ADEPT110_GETLIBRARYANCESTORSEX";
        public static AD_RENAMELIBRARIES_PROC: string = "ADEPT110_RENAMELIBRARIESEX";
        public static AD_CHECKLIBRARIES_PROC: string = "ADEPT110_CHECKLIBRARYNAMESEX";
        public static AD_NATURALSORTFORMAT_FUNC: string = "ADEPT110_NATURALSORTFORMAT";
        public static ADEPT_ORA_FTSIMP: string = "ADEPT110_FTSIMP";
        public static AD_LIBRARYADMIN_PROC: string = "ADEPT110_LIBRARYADMINEX";
        public static AWC_GETCOMPOSITERIGHTS_PROC: string = "ADEPTAWC_GETCOMPOSITERIGHTS";
        public static AWC_GETRIGHT_PROC: string = "ADEPTAWC_GETRIGHT";
        public static AWC_LIBRARYFILTER_PROC: string = "ADEPTAWC_LIBRARYFILTER";
        public static SETTING_EDITABLE_FIELDS: string = "EditableFields";
        public static SETTING_LOCAL_VIEWER_EXTENSIONS: string = "LocalViewerExtensions";
        public static SETTING_ALLOW_DOWNLOAD: string = "AllowDownload";
        public static SETTING_SHOW_VIEW_RENDER_PDF_MENU: string = "ShowViewRenderPdfMenu";
        public static SETTING_UPLOAD_FOLDER: string = "UploadFolder";
        public static SETTING_UPLOAD_EMAIL: string = "UploadEmail";
        public static SETTING_UPLOAD_SUBJECT: string = "UploadSubject";
        public static SETTING_UPLOAD_NOTIFICATION: string = "UploadNotification";
        public static SETTING_VIEWER_TYPE: string = "ViewerType";
        public static SETTING_CLEAR_VL_AT_STARTUP: string = "ClearVLAtStartup";
        public static USERSETTING_CURRENT_INFORMATION_SOURCE: string = "CurInfoSrc";
        public static USERSETTING_RESPECT_OVERLAYS: string = "RespectOverlays";
        public static USERSETTING_RESPECT_IN_CONTEXT: string = "RespectInContext";
        public static USERSETTING_RESPECT_SUBSTITUTE: string = "RespectSubstitute";
        public static USERSETTING_RESPECT_DGN_NO_NESTING: string = "RespectDGNNoNesting";
        public static USERSETTING_REDLINE_COMMENT: string = "RedlineComment";
        public static accessDenied: string = "<access denied>";
        public static blankEntry: string = "<blank entry>";
        public static invalidRecord: string = "<invalid record>";
        public static invalidField: string = "<invalid field>";
        public static VIEWID_S_INBOX: string = "VIEWID_S_INBOX";
        public static SYSTEM_DATA_CARD_ID: string = "SYSTEM_DATA_CARD_ID";
        public static SYSTEM_DATA_CARD_TAB_ID: string = "SYSTEM_DATA_CARD_TAB_ID";
        public static SYSTEM_DATA_CARD_CTRL_BASE_ID: string = "SYSTEM_DATA_CARD_CTRL_BASE_ID";
        public static SYSTEM_DATA_CARD_NAME: string = "Adept Internal Card";
        public static SYSTEM_DATA_CARD_TAB_NAME: string = "Page1";
        public static SYSTEM_WORKFLOW_ID: string = "SYSTEM_WORKFLOW_ID";
        public static SYSTEM_WORKFLOW_NAME: string = "Adept System Workflow";
        public static SYSTEM_WORKFLOW_STEP_ID: string = "SYSTEM_WORKFLOW_STEP_ID";
        public static SYSTEM_WORKFLOW_STEP_NAME: string = "Adept System Step";
        public static FIRST_STEP_ID: string = "FIRST_STEP_ID";
        public static FIRST_STEP_NAME: string = "<First Step>";
        public static FINAL_APPROVE_STEP_ID: string = "FINAL_APPROVE_STEP_ID";
        public static FINAL_APPROVE_STEP_NAME: string = "<Final Approve>";
        public static WORKFLOW_ORIGINATOR_FIELD: string = "S_STEPID";
        public static WORKFLOW_ORIGINATOR_KEY: string = "WFSK_ORIGINATOR";
        public static WF_COMMENT_SIGNIN: string = "SignIn caused a redirection to a previous step.";
        public static WF_COMMENT_ROLLBACK_REVISION: string = "Rollback Version caused a redirection to a previous step.";
        public static CONTROL_LIBPR_TYPE: string = "ADEPT_LIB_PR";
        public static CONTROL_LIBRT_TYPE: string = "ADEPT_LIB_RT";
        public static CONTROL_LIBWF_TYPE: string = "ADEPT_LIB_WF";
        public static LASTSEARCH: string = "___LAST_SEARCH___";
        public static ALTLASTSEARCH: string = "___ALT_LAST_SEARCH___";
        public static APPENDSEARCH: string = "___APPEND_SEARCH___";
        public static REFINESEARCH: string = "___REFINE_SEARCH___";
        public static MEMOSEARCH: string = "__SEARCH_MEMO__";
        public static SEARCHALLFIELDS: string = "__SEARCH_ALL_FIELDS__";
        public static QUICKSEARCHALLFIELDS: string = "__Q_SEARCH_ALL_FIELDS__";
        public static FULLTEXTSEARCH: string = "__SEARCH_FTS__";
        public static WFF_DO_EMAIL_NOTIFY: number = 1;
        public static WFSF_CAN_CHANGE_WORKFLOW: number = 1;
        public static WFSF_CAN_SIGN_OUT: number = 2;
        public static WFSF_CAN_EXPEDITE_REJECT: number = 4;
        public static WFSF_CAN_EXPEDITE_APPROVE: number = 8;
        public static WFSF_DO_EMAIL_NOTIFY: number = 16;
        public static WFSF_REQUIRE_COMMENT: number = 32;
        public static WFSF_ONLY_ALLOW_ASSIGN_TO_APPROVERS: number = 64;
        public static IDLEN: number = 36;
        public static TRUESTR: string = "T";
        public static FALSESTR: string = "F";
        public static TRUECHAR: string = 'T';
        public static FALSECHAR: string = 'F';
        public static SYSTEM_TRANSMITTAL_FILE_TYPE: string = "TRANSMITTAL_FILETYPE_ID";
        public static SYSTEM_TRANSMITTAL_DISPLAY_NAME: string = "(Transmittal)";
        public static VERIFY_BASE_CHAR: number = 0;
        public static VERIFY_BAD_LIB_DIR: number = 1;
        public static VERIFY_BAD_HOLD_DIR: number = 2;
        public static VERIFY_MISSING_FROM_HOLD: number = 4;
        public static VERIFY_MISSING_FROM_LIB: number = 8;
        public static VERIFY_MISSING_FROM_WORK: number = 16;
        public static VERIFY_MISSING_REVISIONS: number = 64;
        public static VERIFY_MISSING_REV_DIR: number = 128;
        public static ADEPT_NULL_VAULTID: string = "ADEPT_NULL_VAULTID";
        public static ADEPT_NULL_LIBID: string = "ADEPT_NULL_LIBID";
        public static ADEPT_NULL_CONTAINERID: string = "ADEPT_NULL_CONTAINERID";
        public static ADEPT_NULL_USRID: string = "ADEPT_NULL_USRID";
        public static ADEPT_NULL_PLUGINID: string = "ADEPT_NULL_PLUGINID";
        public static ADEPT_NULL_TRTMPLID: string = "ADEPT_NULL_TRTMPLID";
        public static ADEPT_MAX_CHILDREN: number = 100000;
        public static BACKSLASH: string = "\\";
        public static FRONTSLASH: string = "/";
        public static WORKAREACOLUMNS: string = "WorkAreaColumns";
        public static RELATIONSHIPBROWSERCOLUMNS: string = "RelationshipBrowserColumns";
        public static SEARCHRESULTREVISIONCOLUMNS: string = "SearchResultRevisionColumns";
        public static FILEGUIDECOLUMNS: string = "FileGuideColumns";
        public static SEARCHRESULTHISTORYCOLUMNS: string = "SearchResultHistoryColumns";
        public static SEARCHRESULTCOLUMNS: string = "SearchResultColumns";
        public static CNTT_SYSTEM: string = "System";
        public static CNTT_API_SHARE: string = "APIShare";
        public static CNTT_GRPLIST: string = "GrpList";
        public static CNTT_STV_SEARCH: string = "SRTSrc";
        public static CNTT_WFLIST: string = "WFList";
        public static CNTT_CUSTOM_RIBBON: string = "UIRib";
        public static CNTT_RIBBON_SET: string = "UIRIBSet";
        public static SYS_LIST_TYPE: string = "S";
        public static FLOAT_NOTIFY_LIST: string = "T";
        public static FIXED_NOTIFY_LIST: string = "X";
        public static RELTYPE_SIMPLE_SEARCH: string = "SR";
        public static RELTYPE_SAF_SEARCH_SUBTYPE: string = "AF";
        public static RELTYPE_MULTI_STEP_SEARCH_LIST: string = "MS";
        public static RELTYPE_MRU_DUMMY_SEARCH: string = "DS";
        public static RELTYPE_UI_RIBBON: string = "UI";
        public static RELTYPE_SEARCH_SCROLLTABLE: string = "ST";
        public static RELTYPE_SEARCH_RESULTS: string = "SR";
        public static RELPATHSKEY: string = "S_RELLIBPATHS";
        public static STATEREL_FLOAT: string = "T";
        public static STATEREL_FIX: string = "X";
        public static STATEREL_WIP: string = "W";
        public static STATEREL_DOCK: string = "D";
        public static STATEREL_MISSING: string = "M";
        public static DOCK_STRING: string = "Dock";
        public static FLOAT_STRING: string = "Float";
        public static FIX_WIP_STRING: string = "Fix WIP";
        public static FIX_CURRENT_STRING: string = "Fix Current";
        public static FIX_PREVIOUS_STRING: string = "Fix Previous";
        public static MISSING_STRING: string = "Missing";
        public static MODEL_SPACE: string = "model";
        public static XRITEM_IN: string = "I";
        public static XRITEM_OUT: string = "O";
        public static XRITEM_OUT_OTHER: string = "T";
        public static XRITEM_HOLD: string = "H";
        public static XRITEM_NEW: string = "N";
        public static XRITEM_NEW_OTHER: string = "E";
        public static XRITEM_UNAVAILABLE: string = "U";
        public static XRITEM_REV: string = "R";
        public static XRITEM_INFINITE: string = "F";
        public static XRITEM_UNDEFINED: string = "?";
        public static DWG_LINKAGE: string = "DW";
        public static MANUAL_LINKAGE: string = "GP";
        public static PRINTREQUEST_LINKAGE: string = "PR";
        public static API_LINKAGE: string = "AP";
        public static TRANSMITTAL_LINKAGE: string = "TR";
        public static XRSUBTYPE_OVERLAY: string = "O";
        public static XRSUBTYPE_UNDERLAY: string = "U";
        public static XRSUBTYPE_ALL: string = "A";
        public static XRSUBTYPE_DIRECT: string = "D";
        public static XRSUBTYPE_INCONTEXT: string = "I";
        public static XRSUBTYPE_SUBSTITUTE: string = "S";
        public static XRSUBTYPE_NONE: string = " ";
    
        public static PARENT_MANUAL: string = "1";
        public static PARENT_MISSING: string = "y";
        public static PARENT_YES: string = "Y";
        public static PARENT_NO: string = " ";
        public static CHILD_YES: string = "T";
        public static CHILD_NO: string = " ";
        public static O_ARC: string = "A";
        public static O_ASN_H: string = "C";
        public static O_ASN_L: string = "E";
        public static O_DUP: string = "F";
        public static O_FINAL: string = "G";
        public static O_HOLD: string = "I";
        public static O_IN: string = "K";
        public static O_LAU: string = "M";
        public static O_LIB: string = "O";
        public static O_NEW: string = "Q";
        public static O_OUT: string = "S";
        public static O_RES: string = "U";
        public static O_UND: string = "W";
        public static PRG_VIEWER: ADEPTT_RIGHTS = ADEPTT_RIGHTS.P_VIEW;
        public static PRG_EDITOR: ADEPTT_RIGHTS = ADEPTT_RIGHTS.P_SO;
        public static PRG_CHECKER: ADEPTT_RIGHTS = ADEPTT_RIGHTS.P_CHECK;
        public static PRG_ADMIN: ADEPTT_RIGHTS = ADEPTT_RIGHTS.P_DELETE;
        public static CULTURE_NAME_ENGLISH: string = "en-US";
        public static WORKFLOW_TRUSTEE_KEY_ANY_VIEWER_IN_LIBRARY: string = "WFTK_VIEWER";
        public static WORKFLOW_TRUSTEE_KEY_ANY_EDITOR_IN_LIBRARY: string = "WFTK_EDITOR";
        public static WORKFLOW_TRUSTEE_KEY_ANY_CHECKER_IN_LIBRARY: string = "WFTK_CHECKER";
        public static WORKFLOW_TRUSTEE_KEY_ANY_ADMIN_IN_LIBRARY: string = "WFTK_ADMIN";
        public static WORKFLOW_TRUSTEE_KEY_ORIGINATOR: string = "WFTK_ORIGINATOR";
        public static NEW: string = "New";
        public static OUT_M: string = "Out";
        public static ARC: string = "Arc";
        public static IN_M: string = "In";
        public static HOLD: string = "Hold";
        public static OUT_H: string = "OutHold";
        public static USED: string = "Duplicate";
        public static ASN_H: string = "AssignHold";
        public static ASN_L: string = "Assign";
        public static DEL: string = "Deleted";
        public static RES: string = "Reserved";
        public static LAU: string = "Launched";
        public static REL_M: string = "Released";
        public static FINAL: string = "Versioned";
        public static UNDEFINED: string = "Undefined";
        public static LINKABLE_M: string = "OutLinkable";
        public static ACS_SET_FILE_TYPE: string = "Set File Type";
        public static ACS_SIGN_IN: string = "Sign In";
        public static ACS_SIGN_OUT: string = "Sign Out";
        public static ACS_COPY: string = "Copy";
        public static ACS_MOVE: string = "Move";
        public static ACS_DELETE: string = "Delete";
        public static ACS_RENAME: string = "Rename";
        public static ACS_RELEASE_OWNERSHIP: string = "Release Ownership";
        public static ACS_SEND_TO: string = "Send To";
        public static ACS_PRINT_FILES: string = "Print Files";
        public static ACS_BATCH_UPDATE: string = "Batch Update";
        public static ACS_CLEAR_EXTRACTED_INFO: string = "Clear Extracted Information";
        public static ACS_EXTRACT: string = "Extract";
        public static ACS_UPDATE_FILES: string = "Update Files";
        public static ACS_BATCH_OPEN_AND_SAVE: string = "Batch Open And Save";
        public static ACS_VIEW_FILES: string = "View Files";
        public static ACS_LAUNCH: string = "Launch";
        public static ACS_CLEAR_EXTRACT_STATE: string = "Clear Extract State";
        public static ACS_CLEAR_TAGS: string = "Clear Tags";
        public static ACS_ARCHIVE: string = "Archive";
        public static ACS_RESTORE: string = "Restore";
        public static ACS_APPROVE: string = "Approve";
        public static ACS_ASSIGN: string = "Assign";
        public static ACS_UNASSIGN: string = "Unassign";
        public static ACS_CREATE_REVISION: string = "Create Revision";
        public static ACS_CLEAR_REDLINES: string = "Clear Redlines";
        public static ACS_LINK: string = "Link";
        public static ACS_UNLINK: string = "Unlink";
        public static ACS_ASSUME_OWNERSHIP: string = "Assume Ownership";
        public static ACS_EXPEDITOR_APPROVE: string = "Expedite Approve";
        public static ACS_REJECT: string = "Reject";
        public static ACS_REJECT_TO: string = "Reject To";
        public static ACS_EXPEDITOR_REJECT: string = "Expedite Reject";
        public static ACS_ASSIGN_WORKFLOW: string = "Assign Workflow";
        public static ACS_SET_DEFAULT_WORKFLOW: string = "Set Default Workflow";
        public static ACS_ROLLBACK_REVISION: string = "Rollback Revision";
        public static ACS_NEW: string = "New";
        public static ACS_UPDATE_DOCUMENT: string = "Update Document";
        public static ACS_EXTRACT_TEXT: string = "Extract Text";
        public static ACS_AUTO_ADVANCE: string = "Auto-Advance";
        public static ACS_WORKFLOW_SYSTEM_PLACEHOLDER: string = "First Check In";
        public static ACS_RELEASE_UNCHANGED_CHILDREN: string = "Release Unchanged Children";
        public static ACS_REFRESH_FILE_SIZE: string = "Refresh File Size";
        public static ACS_CREATE_DUPLICATES_TABLE: string = "Create Duplicates Table";
        public static ACS_START_PROGRAM: string = "Start Program";
        public static ACS_WORKFLOW_DEF_MANAGER: string = "Workflow Administration";
        public static FTS_CLIENT: string = "FTSUpdate";
        public static FTS_ENDPOINT: string = "Document/FTSUpdate";
    }
}



