import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ImageSourcePropType } from "react-native";

type RootStackParamList = {
  MotoDetails: {
    placa: string;
    modelo: string;
    cor: string;
    setor: string;
    status: string;
  };
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MotoDetails"
>;

type Moto = {
  id: string;
  placa: string;
  modelo: string;
  cor: string;
  status: string;
  chassis: string;
  image: ImageSourcePropType;
  sectorId: string | null;
};

type Sector = {
  id: string;
  name: string;
  description?: string;
  color: string;
  motoIds: string[];
};

type MotoFormState = {
  placa: string;
  modelo: string;
  cor: string;
  status: string;
  chassis: string;
  sectorId: string | null;
};

type SectorFormState = {
  name: string;
  description: string;
  color: string;
  motoIds: string[];
};

const motoImage = require("../../assets/moto.png");

const initialMotos: Moto[] = [
  {
    id: "moto-1",
    placa: "FTL-4C85",
    modelo: "Mottu Sport",
    cor: "Preto",
    status: "Ativo",
    chassis: "9451687135135",
    image: motoImage,
    sectorId: "sector-1",
  },
  {
    id: "moto-2",
    placa: "POU-4C95",
    modelo: "Mottu Pop",
    cor: "Vermelho",
    status: "Manutenção",
    chassis: "9451687135135",
    image: motoImage,
    sectorId: "sector-2",
  },
];

const initialSectors: Sector[] = [
  {
    id: "sector-1",
    name: "Setor Verde (Manutenção)",
    description: "Motos reservadas para revisão.",
    color: "#4CAF50",
    motoIds: ["moto-1"],
  },
  {
    id: "sector-2",
    name: "Setor Vermelho (Pátio Principal)",
    description: "Disponíveis para retirada imediata.",
    color: "#F44336",
    motoIds: ["moto-2"],
  },
];

const emptyMotoForm: MotoFormState = {
  placa: "",
  modelo: "",
  cor: "",
  status: "",
  chassis: "",
  sectorId: null,
};

const emptySectorForm: SectorFormState = {
  name: "",
  description: "",
  color: "#169BA4",
  motoIds: [],
};

export default function MotoMenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<"Motos" | "Setores">("Motos");
  const [searchText, setSearchText] = useState("");
  const [motos, setMotos] = useState<Moto[]>(initialMotos);
  const [sectors, setSectors] = useState<Sector[]>(initialSectors);

  const [isMotoModalVisible, setMotoModalVisible] = useState(false);
  const [isSectorModalVisible, setSectorModalVisible] = useState(false);
  const [motoForm, setMotoForm] = useState<MotoFormState>(emptyMotoForm);
  const [sectorForm, setSectorForm] =
    useState<SectorFormState>(emptySectorForm);
  const [editingMotoId, setEditingMotoId] = useState<string | null>(null);
  const [editingSectorId, setEditingSectorId] = useState<string | null>(null);
  const [motoFormError, setMotoFormError] = useState<string | null>(null);
  const [sectorFormError, setSectorFormError] = useState<string | null>(null);

  const filteredMotos = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();
    if (!normalizedSearch) {
      return motos;
    }
    return motos.filter(
      (moto) =>
        moto.placa.toLowerCase().includes(normalizedSearch) ||
        moto.modelo.toLowerCase().includes(normalizedSearch) ||
        moto.chassis.toLowerCase().includes(normalizedSearch),
    );
  }, [motos, searchText]);

  const getSectorName = (sectorId: string | null) => {
    if (!sectorId) {
      return "Sem setor";
    }
    const sector = sectors.find((item) => item.id === sectorId);
    return sector ? sector.name : "Sem setor";
  };

  const closeMotoModal = () => {
    setMotoModalVisible(false);
    setMotoForm(emptyMotoForm);
    setEditingMotoId(null);
    setMotoFormError(null);
  };

  const closeSectorModal = () => {
    setSectorModalVisible(false);
    setSectorForm(emptySectorForm);
    setEditingSectorId(null);
    setSectorFormError(null);
  };

  const openCreateMotoModal = () => {
    setMotoForm(emptyMotoForm);
    setEditingMotoId(null);
    setMotoFormError(null);
    setMotoModalVisible(true);
  };

  const openEditMotoModal = (moto: Moto) => {
    setMotoForm({
      placa: moto.placa,
      modelo: moto.modelo,
      cor: moto.cor,
      status: moto.status,
      chassis: moto.chassis,
      sectorId: moto.sectorId,
    });
    setEditingMotoId(moto.id);
    setMotoFormError(null);
    setMotoModalVisible(true);
  };

  const openCreateSectorModal = () => {
    setSectorForm(emptySectorForm);
    setEditingSectorId(null);
    setSectorFormError(null);
    setSectorModalVisible(true);
  };

  const openEditSectorModal = (sector: Sector) => {
    setSectorForm({
      name: sector.name,
      description: sector.description ?? "",
      color: sector.color,
      motoIds: sector.motoIds,
    });
    setEditingSectorId(sector.id);
    setSectorFormError(null);
    setSectorModalVisible(true);
  };

  const handleSaveMoto = () => {
    const trimmedPlaca = motoForm.placa.trim();
    const trimmedModelo = motoForm.modelo.trim();
    const trimmedCor = motoForm.cor.trim();
    const trimmedStatus = motoForm.status.trim();
    const trimmedChassis = motoForm.chassis.trim();

    if (
      !trimmedPlaca ||
      !trimmedModelo ||
      !trimmedCor ||
      !trimmedStatus ||
      !trimmedChassis
    ) {
      setMotoFormError("Preencha todos os campos obrigatórios.");
      return;
    }

    const formattedPlaca = trimmedPlaca.toUpperCase();
    const motoId = editingMotoId ?? `moto-${Date.now()}`;
    const updatedMoto: Moto = {
      id: motoId,
      placa: formattedPlaca,
      modelo: trimmedModelo,
      cor: trimmedCor,
      status: trimmedStatus,
      chassis: trimmedChassis,
      image: motoImage,
      sectorId: motoForm.sectorId,
    };

    setMotos((previous) => {
      const exists = previous.some((moto) => moto.id === motoId);
      if (exists) {
        return previous.map((moto) =>
          moto.id === motoId ? updatedMoto : moto,
        );
      }
      return [...previous, updatedMoto];
    });

    setSectors((previous) =>
      previous.map((sector) => {
        const filteredMotoIds = sector.motoIds.filter((id) => id !== motoId);
        if (updatedMoto.sectorId && sector.id === updatedMoto.sectorId) {
          return {
            ...sector,
            motoIds: [...filteredMotoIds, motoId],
          };
        }
        return {
          ...sector,
          motoIds: filteredMotoIds,
        };
      }),
    );

    closeMotoModal();
  };

  const handleDeleteMoto = (motoId: string) => {
    Alert.alert(
      "Remover moto",
      "Tem certeza que deseja excluir esta moto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setMotos((previous) =>
              previous.filter((moto) => moto.id !== motoId),
            );
            setSectors((previous) =>
              previous.map((sector) => ({
                ...sector,
                motoIds: sector.motoIds.filter((id) => id !== motoId),
              })),
            );
          },
        },
      ],
    );
  };

  const handleSaveSector = () => {
    const trimmedName = sectorForm.name.trim();
    if (!trimmedName) {
      setSectorFormError("Informe o nome do setor.");
      return;
    }

    const sectorId = editingSectorId ?? `sector-${Date.now()}`;
    const updatedSector: Sector = {
      id: sectorId,
      name: trimmedName,
      description: sectorForm.description.trim(),
      color: sectorForm.color || "#169BA4",
      motoIds: sectorForm.motoIds,
    };

    setSectors((previous) => {
      const exists = previous.some((sector) => sector.id === sectorId);
      const base = exists
        ? previous.map((sector) =>
            sector.id === sectorId ? updatedSector : sector,
          )
        : [...previous, updatedSector];

      return base.map((sector) => {
        if (sector.id === sectorId) {
          return { ...sector, motoIds: sectorForm.motoIds };
        }
        return {
          ...sector,
          motoIds: sector.motoIds.filter(
            (motoId) => !sectorForm.motoIds.includes(motoId),
          ),
        };
      });
    });

    setMotos((previous) =>
      previous.map((moto) => {
        if (sectorForm.motoIds.includes(moto.id)) {
          return { ...moto, sectorId };
        }
        if (moto.sectorId === sectorId && !sectorForm.motoIds.includes(moto.id)) {
          return { ...moto, sectorId: null };
        }
        return moto;
      }),
    );

    closeSectorModal();
  };

  const handleDeleteSector = (sectorId: string) => {
    Alert.alert(
      "Remover setor",
      "Excluir o setor também remove a associação das motos. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setSectors((previous) =>
              previous.filter((sector) => sector.id !== sectorId),
            );
            setMotos((previous) =>
              previous.map((moto) =>
                moto.sectorId === sectorId
                  ? { ...moto, sectorId: null }
                  : moto,
              ),
            );
          },
        },
      ],
    );
  };

  const toggleSectorMotoSelection = (motoId: string) => {
    setSectorForm((previous) => {
      const exists = previous.motoIds.includes(motoId);
      return {
        ...previous,
        motoIds: exists
          ? previous.motoIds.filter((id) => id !== motoId)
          : [...previous.motoIds, motoId],
      };
    });
  };

  const renderMotoItem = ({ item }: { item: Moto }) => (
    <View style={styles.motoItem}>
      <TouchableOpacity
        style={styles.motoInfoContainer}
        onPress={() =>
          navigation.navigate("MotoDetails", {
            placa: item.placa,
            modelo: item.modelo,
            cor: item.cor,
            setor: getSectorName(item.sectorId),
            status: item.status,
          })
        }
      >
        <Image source={item.image} style={styles.motoImage} />
        <View style={styles.motoInfo}>
          <Text style={styles.motoModel}>{item.modelo}</Text>
          <Text style={styles.motoDetails}>Placa: {item.placa}</Text>
          <Text style={styles.motoDetails}>Chassi: {item.chassis}</Text>
          <Text style={styles.motoDetails}>
            Setor: {getSectorName(item.sectorId)}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openEditMotoModal(item)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteMoto(item.id)}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectorItem = ({ item }: { item: Sector }) => (
    <View style={styles.setorItem}>
      <View style={[styles.statusIndicator, { backgroundColor: item.color }]} />
      <View style={styles.setorInfo}>
        <Text style={styles.setorName}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.setorDescription}>{item.description}</Text>
        ) : null}
        <Text style={styles.setorMotoCount}>
          {item.motoIds.length} moto(s) alocada(s)
        </Text>
        {item.motoIds.length > 0 ? (
          <Text style={styles.setorMotoList}>
            {item.motoIds
              .map((motoId) =>
                motos.find((moto) => moto.id === motoId)?.placa ?? "",
              )
              .filter(Boolean)
              .join(", ")}
          </Text>
        ) : (
          <Text style={styles.setorMotoList}>Nenhuma moto vinculada</Text>
        )}
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => openEditSectorModal(item)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteSector(item.id)}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {activeTab === "Motos"
          ? "Nenhuma moto cadastrada. Adicione a primeira moto."
          : "Nenhum setor cadastrado. Crie um setor para organizar as motos."}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={motoImage} style={styles.profileImage} />
        <Text style={styles.profileName}>John Daniel</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Motos" && styles.activeTab]}
          onPress={() => setActiveTab("Motos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Motos" && styles.activeTabText,
            ]}
          >
            Motos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Setores" && styles.activeTab]}
          onPress={() => setActiveTab("Setores")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Setores" && styles.activeTabText,
            ]}
          >
            Setores
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Motos" ? (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar placa, chassi ou modelo"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredMotos}
            keyExtractor={(item) => item.id}
            renderItem={renderMotoItem}
            contentContainerStyle={
              filteredMotos.length === 0
                ? styles.emptyListContent
                : styles.listContent
            }
            ListEmptyComponent={renderEmptyState}
          />
        </>
      ) : (
        <FlatList
          data={sectors}
          keyExtractor={(item) => item.id}
          renderItem={renderSectorItem}
          contentContainerStyle={
            sectors.length === 0 ? styles.emptyListContent : styles.listContent
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          activeTab === "Motos" ? openCreateMotoModal() : openCreateSectorModal()
        }
      >
        <Text style={styles.addButtonText}>
          {activeTab === "Motos" ? "Adicionar moto" : "Adicionar setor"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isMotoModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeMotoModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingMotoId ? "Editar moto" : "Nova moto"}
            </Text>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <Text style={styles.inputLabel}>Placa</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="FTL-4C85"
                value={motoForm.placa}
                autoCapitalize="characters"
                onChangeText={(value) =>
                  setMotoForm((previous) => ({ ...previous, placa: value }))
                }
              />

              <Text style={styles.inputLabel}>Modelo</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Mottu Sport"
                value={motoForm.modelo}
                onChangeText={(value) =>
                  setMotoForm((previous) => ({ ...previous, modelo: value }))
                }
              />

              <Text style={styles.inputLabel}>Cor</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Preto"
                value={motoForm.cor}
                onChangeText={(value) =>
                  setMotoForm((previous) => ({ ...previous, cor: value }))
                }
              />

              <Text style={styles.inputLabel}>Status</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Ativo"
                value={motoForm.status}
                onChangeText={(value) =>
                  setMotoForm((previous) => ({ ...previous, status: value }))
                }
              />

              <Text style={styles.inputLabel}>Chassi</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="9451687135135"
                value={motoForm.chassis}
                onChangeText={(value) =>
                  setMotoForm((previous) => ({ ...previous, chassis: value }))
                }
              />

              <Text style={styles.inputLabel}>Setor</Text>
              <View style={styles.sectorChipsContainer}>
                <TouchableOpacity
                  key="no-sector"
                  style={[
                    styles.sectorChip,
                    motoForm.sectorId === null && styles.sectorChipSelected,
                  ]}
                  onPress={() =>
                    setMotoForm((previous) => ({
                      ...previous,
                      sectorId: null,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.sectorChipText,
                      motoForm.sectorId === null &&
                        styles.sectorChipTextSelected,
                    ]}
                  >
                    Sem setor
                  </Text>
                </TouchableOpacity>
                {sectors.map((sector) => {
                  const isSelected = motoForm.sectorId === sector.id;
                  return (
                    <TouchableOpacity
                      key={sector.id}
                      style={[
                        styles.sectorChip,
                        isSelected && styles.sectorChipSelected,
                      ]}
                      onPress={() =>
                        setMotoForm((previous) => ({
                          ...previous,
                          sectorId: sector.id,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.sectorChipText,
                          isSelected && styles.sectorChipTextSelected,
                        ]}
                      >
                        {sector.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {motoFormError ? (
                <Text style={styles.errorText}>{motoFormError}</Text>
              ) : null}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalCancelButton]}
                onPress={closeMotoModal}
              >
                <Text style={styles.modalActionText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalConfirmButton]}
                onPress={handleSaveMoto}
              >
                <Text style={styles.modalActionText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isSectorModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeSectorModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingSectorId ? "Editar setor" : "Novo setor"}
            </Text>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <Text style={styles.inputLabel}>Nome</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Setor Verde"
                value={sectorForm.name}
                onChangeText={(value) =>
                  setSectorForm((previous) => ({ ...previous, name: value }))
                }
              />

              <Text style={styles.inputLabel}>Descrição</Text>
              <TextInput
                style={[styles.modalInput, styles.multilineInput]}
                placeholder="Observações do setor"
                value={sectorForm.description}
                multiline
                onChangeText={(value) =>
                  setSectorForm((previous) => ({
                    ...previous,
                    description: value,
                  }))
                }
              />

              <Text style={styles.inputLabel}>Cor (hexadecimal)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="#169BA4"
                value={sectorForm.color}
                autoCapitalize="characters"
                onChangeText={(value) =>
                  setSectorForm((previous) => ({ ...previous, color: value }))
                }
              />

              <Text style={styles.inputLabel}>Motos no setor</Text>
              <View>
                {motos.length === 0 ? (
                  <Text style={styles.emptyStateText}>
                    Cadastre motos antes de vinculá-las a um setor.
                  </Text>
                ) : (
                  motos.map((moto) => {
                    const isSelected = sectorForm.motoIds.includes(moto.id);
                    const alreadyAssigned =
                      moto.sectorId && moto.sectorId !== editingSectorId;
                    return (
                      <TouchableOpacity
                        key={moto.id}
                        style={styles.selectionRow}
                        onPress={() => toggleSectorMotoSelection(moto.id)}
                      >
                        <View
                          style={[styles.checkbox, isSelected && styles.checked]}
                        >
                          {isSelected ? (
                            <Text style={styles.checkboxMark}>✓</Text>
                          ) : null}
                        </View>
                        <View style={styles.selectionInfo}>
                          <Text style={styles.selectionTitle}>{moto.modelo}</Text>
                          <Text style={styles.selectionSubtitle}>
                            Placa {moto.placa}
                            {alreadyAssigned
                              ? ` • atualmente em ${getSectorName(moto.sectorId)}`
                              : ""}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>

              {sectorFormError ? (
                <Text style={styles.errorText}>{sectorFormError}</Text>
              ) : null}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalCancelButton]}
                onPress={closeSectorModal}
              >
                <Text style={styles.modalActionText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalActionButton, styles.modalConfirmButton]}
                onPress={handleSaveSector}
              >
                <Text style={styles.modalActionText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
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
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#169BA4",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#169BA4",
    fontWeight: "700",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
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
    justifyContent: "center",
    paddingBottom: 120,
  },
  motoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  motoInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
  },
  motoDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  itemActions: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "flex-end",
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#169BA4",
  },
  deleteButton: {
    backgroundColor: "#E53935",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  setoresContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setorItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
    alignItems: "flex-start",
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
    fontWeight: "600",
  },
  setorDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  setorMotoCount: {
    fontSize: 12,
    color: "#169BA4",
    marginTop: 6,
  },
  setorMotoList: {
    fontSize: 12,
    color: "#444",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    textAlign: "center",
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#169BA4",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalScrollContent: {
    paddingBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  multilineInput: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  sectorChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectorChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#169BA4",
    marginRight: 8,
    marginBottom: 8,
  },
  sectorChipSelected: {
    backgroundColor: "#169BA4",
  },
  sectorChipText: {
    fontSize: 12,
    color: "#169BA4",
  },
  sectorChipTextSelected: {
    color: "#fff",
  },
  errorText: {
    color: "#E53935",
    marginTop: 12,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  modalActionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
  },
  modalCancelButton: {
    backgroundColor: "#ccc",
  },
  modalConfirmButton: {
    backgroundColor: "#169BA4",
  },
  modalActionText: {
    color: "#fff",
    fontWeight: "600",
  },
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#169BA4",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#169BA4",
  },
  checkboxMark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  selectionInfo: {
    flex: 1,
  },
  selectionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  selectionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
