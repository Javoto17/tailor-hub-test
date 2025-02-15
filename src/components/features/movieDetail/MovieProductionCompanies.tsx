import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface CompanyItem {
  id: number;
  logo_path: string | null;
  name: string;
}

interface MovieProductionCompaniesProps {
  companies: CompanyItem[];
}

const MovieProductionCompanies: React.FC<MovieProductionCompaniesProps> = ({
  companies,
}) => (
  <View style={styles.productionCompaniesSection}>
    <Text style={styles.heading}>Production Companies</Text>
    {companies.map((company) => (
      <View key={company.id} style={styles.companyItem}>
        <Text>{company.name}</Text>
        {company.logo_path && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w200${company.logo_path}`,
            }}
            style={styles.companyLogo}
          />
        )}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  productionCompaniesSection: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyLogo: {
    width: 50,
    height: 50,
    marginLeft: 8,
  },
});

export default MovieProductionCompanies;
