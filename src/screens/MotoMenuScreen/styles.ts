import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#169BA4',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#169BA4',
    fontWeight: '700',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 120,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  motoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  motoInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  motoImage: {
    width: 60,
    height: 40,
    marginRight: 12,
  },
  motoInfo: {
    flex: 1,
  },
  motoModel: {
    fontSize: 16,
    fontWeight: '600',
  },
  motoDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#169BA4',
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  setoresContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setorItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 4,
  },
  setorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  setorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  setorDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  setorMotoCount: {
    fontSize: 12,
    color: '#169BA4',
    marginTop: 6,
  },
  setorMotoList: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#169BA4',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalScrollContent: {
    paddingBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  multilineInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  sectorChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectorChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#169BA4',
    marginRight: 8,
    marginBottom: 8,
  },
  sectorChipSelected: {
    backgroundColor: '#169BA4',
  },
  sectorChipText: {
    fontSize: 12,
    color: '#169BA4',
  },
  sectorChipTextSelected: {
    color: '#fff',
  },
  errorText: {
    color: '#E53935',
    marginTop: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  modalActionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
  },
  modalConfirmButton: {
    backgroundColor: '#169BA4',
  },
  modalActionText: {
    color: '#fff',
    fontWeight: '600',
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#169BA4',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#169BA4',
  },
  checkboxMark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  selectionInfo: {
    flex: 1,
  },
  selectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
