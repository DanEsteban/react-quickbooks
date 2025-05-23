import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ProfitLossItem } from '@/api/perdidas-ganancias/pyg-types'; // Asegúrate de importar la interfaz correcta

interface PerdidasGananciasPDFProps {
    startDate: string;
    endDate: string;
    level: number | 'All';
    report: ProfitLossItem[];
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 18,
        marginBottom: 6,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a365d',
    },
    subheader: {
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'center',
        color: '#2c5282',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: 10,
    },
    infoLeft: {
        width: '50%',
    },
    infoRight: {
        width: '50%',
        textAlign: 'right',
    },
    infoText: {
        fontSize: 9,
        color: '#4a5568',
        marginBottom: 3,
    },
    table: {
        display: 'flex',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cbd5e0',
        borderRadius: 2,
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        minHeight: 22, // Altura mínima para mejorar la legibilidad
    },
    tableRowEven: {
        backgroundColor: '#f7fafc',
    },
    tableRowOdd: {
        backgroundColor: '#ffffff',
    },
    tableColHeader: {
        backgroundColor: '#2b6cb0',
        padding: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    codeHeader: {
        width: '25%',
        borderRight: '1px solid #e2e8f0',
    },
    nameHeader: {
        width: '50%',
        borderRight: '1px solid #e2e8f0',
    },
    mensualHeader: {
        width: '25%',
    },
    totalHeader: {
        width: '25%',
    },
    tableColCode: {
        width: '25%',
        padding: '5px 8px',
        textAlign: 'left',
        justifyContent: 'center',
        borderRight: '1px solid #e2e8f0',
    },
    tableColName: {
        width: '50%',
        padding: '5px 8px',
        textAlign: 'left',
        justifyContent: 'center',
        borderRight: '1px solid #e2e8f0',
    },
    tableColTotal: {
        width: '25%',
        padding: '5px 8px',
        textAlign: 'right',
        justifyContent: 'center',
    },
    tableCell: {
        fontSize: 9,
    },
    boldText: {
        fontWeight: 'bold',
    },
    // Diferentes niveles de indentación
    level1: {
        paddingLeft: 0,
    },
    level2: {
        paddingLeft: 10,
    },
    level3: {
        paddingLeft: 20,
    },
    level4: {
        paddingLeft: 30,
    },
    // Estilos para totales
    sectionTotal: {
        backgroundColor: '#ebf8ff',
        fontWeight: 'bold',
    },
    mainTotal: {
        backgroundColor: '#2c5282',
        color: 'white',
        fontWeight: 'bold',
    },
    finalTotal: {
        backgroundColor: '#1a365d',
        color: 'white',
        fontWeight: 'bold',
    },
    pageNumber: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 9,
        color: '#718096',
    },
    footer: {
        position: 'absolute',
        bottom: 15,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 8,
        color: '#a0aec0',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 5,
    },
});

const PerdidasGananciasPDF: React.FC<PerdidasGananciasPDFProps> = ({ startDate, endDate, level, report }) => {
    const formatCurrency = (value: number | null | undefined) => {
        const numericValue = value || 0;
        return new Intl.NumberFormat('es-EC', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(numericValue);
    };

    const fechaEmision = new Date().toLocaleString('es-EC', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const getLevelStyle = (level: number) => {
        switch (level) {
            case 1: return styles.level1;
            case 2: return styles.level2;
            case 3: return styles.level3;
            case 4: return styles.level4;
            default: return styles.level4;
        }
    };

    const getRowStyle = (item: ProfitLossItem, index: number) => {
        if (item.code === 'NET') {
            return styles.finalTotal;
        }
        if (item.isHeader && item.level === 1) {
            return styles.sectionTotal;
        }

        return index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd;
    };

    const splitReportIntoPages = (report: ProfitLossItem[], rowsPerPage: number = 20) => {
        const pages = [];
        for (let i = 0; i < report.length; i += rowsPerPage) {
            pages.push(report.slice(i, i + rowsPerPage));
        }
        return pages;
    };

    const pages = splitReportIntoPages(report);

    return (
        <Document>
            {pages.map((page, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    {/* Encabezado */}
                    <Text style={styles.header}>VJOB</Text>
                    <Text style={styles.header}>ESTADO DE PÉRDIDAS Y GANANCIAS</Text>
                    <Text style={styles.subheader}>
                        Desde: {startDate} | Hasta: {endDate}
                    </Text>

                    {/* Información adicional */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoLeft}>
                            <Text style={styles.infoText}>Nivel de detalle: {level === 'All' ? 'Todos' : level}</Text>
                            <Text style={styles.infoText}>Ejercicio Fiscal: {new Date(endDate).getFullYear()}</Text>
                        </View>
                        <View style={styles.infoRight}>
                            <Text style={styles.infoText}>Fecha de emisión: {fechaEmision}</Text>
                            <Text style={styles.infoText}>Página {pageIndex + 1} de {pages.length}</Text>
                        </View>
                    </View>

                    {/* Tabla */}
                    <View style={styles.table}>
                        {/* Encabezado de la tabla */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableColHeader, styles.codeHeader]}>
                                <Text style={styles.tableCell}>CÓDIGO</Text>
                            </View>
                            <View style={[styles.tableColHeader, styles.nameHeader]}>
                                <Text style={styles.tableCell}>NOMBRE</Text>
                            </View>
                            <View style={[styles.tableColHeader, styles.mensualHeader]}>
                                <Text style={styles.tableCell}>MENSUAL</Text>
                            </View>
                            <View style={[styles.tableColHeader, styles.totalHeader]}>
                                <Text style={styles.tableCell}>TOTAL</Text>
                            </View>
                        </View>

                        {/* Filas de la tabla */}
                        {page.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.tableRow,
                                    getRowStyle(item, index)
                                ]}
                            >
                                <View style={styles.tableColCode}>
                                    <Text style={[
                                        styles.tableCell,
                                        item.isHeader ? styles.boldText : {}
                                    ]}>
                                        {item.code}
                                    </Text>
                                </View>
                                <View style={styles.tableColName}>
                                    <Text style={[
                                        styles.tableCell,
                                        item.isHeader ? styles.boldText : {},
                                        getLevelStyle(item.level)
                                    ]}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.tableColTotal}>
                                    <Text style={[
                                        styles.tableCell,
                                        item.isHeader ? styles.boldText : {}
                                    ]}>
                                        {formatCurrency(item.monthly)}
                                    </Text>
                                </View>
                                <View style={styles.tableColTotal}>
                                    <Text style={[
                                        styles.tableCell,
                                        item.isHeader ? styles.boldText : {}
                                    ]}>
                                        {formatCurrency(item.total)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Pie de página */}
                    <Text style={styles.footer}>
                        Este documento es una representación impresa del Balance General. VJOB © {new Date().getFullYear()}
                    </Text>
                </Page>
            ))}
        </Document>
    );
};

export default PerdidasGananciasPDF;